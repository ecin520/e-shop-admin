import request from '../utils/request'

export function listProductCategories(pageNum, pageSize, keyword) {
  return request({
    url: '/api/product/admin/category/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      keyword: keyword
    }
  })
}

export function insertProductCategory(productCategory) {
  return request({
    url: '/api/product/admin/category/insert',
    method: 'POST',
    data: productCategory
  })
}

export function updateProductCategory(productCategory) {
  return request({
    url: '/api/product/admin/category/update',
    method: 'PUT',
    data: productCategory
  })
}

export function deleteProductCategoryById(id) {
  return request({
    url: '/api/product/admin/category/delete/' + id,
    method: 'DELETE'
  })
}

export function listProductCategoryDetailsByParam(queryParam) {
  return request({
    url: '/api/product/admin/category/details',
    method: 'POST',
    data: queryParam
  })
}

export function insertProductCategoryDetail(productCategoryDetail) {
  return request({
    url: '/api/product/admin/category/detail/insert',
    method: 'POST',
    data: productCategoryDetail
  })
}

export function deleteProductCategoryDetailById(id) {
  return request({
    url: '/api/product/admin/category/detail/delete',
    method: 'DELETE',
    params: {
      id: id
    }
  })
}

export function updateProductCategoryDetail(productCategoryDetail) {
  return request({
    url: '/api/product/admin/category/detail/update',
    method: 'PUT',
    data: productCategoryDetail
  })
}

export function listProductSpecsByCategoryId(categoryId) {
  return request({
    url: '/api/product/admin/category_spec/list',
    method: 'GET',
    params: {
      categoryId: categoryId
    }
  })
}

export function getProductCategoryDetailDTOById(categoryDetailId) {
  return request({
    url: '/api/product/admin/category/detail/' + categoryDetailId,
    method: 'GET'
  })
}

export function listProductSpecDTOsByCategoryId(categoryId) {
  return request({
    url: '/api/product/admin/category_spec/view/list',
    method: 'GET',
    params: {
      categoryId: categoryId
    }
  })
}

export function listProductSpecDTOsByCategoryIdAndProductId(categoryId, productId) {
  return request({
    url: '/api/product/admin/category_spec/view/list/by/category_product',
    method: 'GET',
    params: {
      categoryId: categoryId,
      productId: productId
    }
  })
}

export function listSpecDetailsByProductId(productId) {
  return request({
    url: '/api/product/admin/category_spec/spec_detail/list',
    method: 'GET',
    params: {
      productId: productId
    }
  })
}

export function updateProductCategorySpecs(categoryId, productSpecIds) {
  return request({
    url: '/api/product/admin/category_spec/update/' + categoryId,
    method: 'PUT',
    data: productSpecIds
  })
}


