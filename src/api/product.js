import request from '../utils/request'
import da from "element-ui/src/locale/lang/da";

export function deleteProductById(id) {
  return request({
    url: '/api/product/admin/product/delete',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function insertProduct(product) {
  return request({
    url: '/api/product/admin/product/insert',
    method: 'POST',
    data: product
  })
}

export function insertProductByParam(productParam) {
  return request({
    url: '/api/product/admin/product/param/insert',
    method: 'POST',
    data: productParam
  })
}

export function updateProductByParam(productParam) {
  return request({
    url: '/api/product/admin/product/param/update',
    method: 'POST',
    data: productParam
  })
}

export function listProducts(queryParam) {
  return request({
    url: '/api/product/admin/product/list',
    method: 'POST',
    data: queryParam
  })
}

export function getProduct(queryParam) {
  return request({
    url: '/api/product/admin/product/query',
    method: 'POST',
    data: queryParam

  })
}

export function deleteSkuProductById(id) {
  return request({
    url: '/api/product/admin/product/sku/delete',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function insertSkuProduct(skuProduct) {
  return request({
    url: '/api/product/admin/product/sku/insert',
    method: 'POST',
    data: skuProduct
  })
}

export function listSkuProducts(pageNum, pageSize, name, productId, productSpecDetailId) {
  var FormData = require('form-data');
  var data = new FormData();
  data.append('pageNum', pageNum);
  data.append('pageSize', pageSize);
  data.append('name', name);
  data.append('productId', productId);
  data.append('productSpecDetailId', productSpecDetailId);
  return request({
    url: '/api/product/admin/product/sku/list',
    method: 'POST',
    data: data
  })
}


export function getSkuProduct(queryParam) {
  return request({
    url: '/api/product/admin/product/sku/query',
    method: 'POST',
    data: queryParam
  })
}

export function updateSkuProduct(skuProduct) {
  return request({
    url: '/api/product/admin/product/sku/update',
    method: 'PUT',
    data: skuProduct
  })
}

export function updateProduct(product) {
  return request({
    url: '/api/product/admin/product/update',
    method: 'PUT',
    data: product
  })
}

export function getSkuProductByParam(productId, specDetailIds) {
  return request({
    url: '/api/product/admin/product/sku/' + productId,
    method: 'POST',
    data: specDetailIds
  })
}
