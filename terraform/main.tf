terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket  = "bjh-terraform-state"
    key     = "brianhansonnet.tfstate"
    region  = "us-east-1"
    profile = "bh-admin"
  }

}

provider "aws" {
  profile = "bh-admin"
  region  = "us-east-1"
}

provider "aws" {
  region  = "us-east-1"
  alias   = "us-east-1"
  profile = "bh-admin"
}

resource "aws_iam_user" "craft" {
  name = "craft-brianhanson-assets"

  tags = {
    Property = "brianhanson.net"
  }
}

resource "aws_iam_access_key" "craft" {
  user = aws_iam_user.craft.name
}

resource "aws_s3_bucket_acl" "craft_bucket_acl" {
  bucket = aws_s3_bucket.craft_assets.id
  acl    = "private"
}

resource "aws_s3_bucket" "craft_assets" {
  bucket = "brianhanson.net-craftcms-assets"

  tags = {
    Property = "brianhanson.net"
  }
}

data "aws_iam_policy_document" "allow_cloudfront_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.craft_oai.iam_arn]
    }
    actions   = ["s3:GetObject"]
    resources = [
      aws_s3_bucket.craft_assets.arn,
      "${aws_s3_bucket.craft_assets.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "craft_bucket_policy" {
  bucket = aws_s3_bucket.craft_assets.bucket
  policy = data.aws_iam_policy_document.allow_cloudfront_access.json
}

resource "aws_iam_user_policy" "craft_aws" {
  name = "craftcms-assets-policy"
  user = aws_iam_user.craft.name

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Effect = "Allow",
        Action = [
          "s3:ListAllMyBuckets"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetBucketLocation",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl"
        ],
        Resource = [
          "${aws_s3_bucket.craft_assets.arn}/*"
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetBucketLocation",
          "s3:ListBucket"
        ],
        Resource = [
          aws_s3_bucket.craft_assets.arn
        ]
      }
    ]
  })
}

locals {
  s3_origin_id = "craftS3Origin"
}

resource "aws_acm_certificate" "cdn_cert" {
  domain_name       = "assets.brianhanson.net"
  validation_method = "DNS"
  provider          = aws.us-east-1

  tags = {
    Property = "brianhanson.net"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cloudfront_origin_access_identity" "craft_oai" {
}

resource "aws_cloudfront_distribution" "craft_assets_cdn" {
  enabled = true

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  origin {
    domain_name = aws_s3_bucket.craft_assets.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.craft_oai.cloudfront_access_identity_path
    }
  }


  aliases = ["assets.brianhanson.net"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.cdn_cert.arn
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = true
  }
}

output "secret" {
  value = aws_iam_access_key.craft.encrypted_secret
}

output "key" {
  value = aws_iam_access_key.craft.id
}

output "bucket" {
  value = aws_s3_bucket.craft_assets.bucket
}

output "bucket_region" {
  value = aws_s3_bucket.craft_assets.region
}

output "distribution_id" {
  value = aws_cloudfront_distribution.craft_assets_cdn.id
}

output "distribution_domain" {
  value = aws_cloudfront_distribution.craft_assets_cdn.domain_name
}

output "acm_certificate_domain_validation_options" {
  description = "A list of attributes to feed into other resources to complete certificate validation. Can have more than one element, e.g. if SANs are defined. Only set if DNS-validation was used."
  value       = aws_acm_certificate.cdn_cert.domain_validation_options
}
