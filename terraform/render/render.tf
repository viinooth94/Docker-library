terraform {
  required_providers {
    render = {
      source = "render-oss/render"
      version = "1.6.0"
    }
  }
}

provider "render" {
  api_key = var.render_api_key
  owner_id = var.render_owner_id
}

variable "render_api_key" {
    type = string
}

variable "render_owner_id" {
    type = string
}