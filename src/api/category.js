import request from '../utils/request'
import ca from "element-ui/src/locale/lang/ca";

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

export function listProductCategoryDetailByCategoryId(pageNum, pageSize, categoryId) {
  return request({
    url: '/api/product/admin/category/details',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      categoryId: categoryId
    }
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
    url: '/api/product/admin/category/spec/list',
    method: 'GET',
    params: {
      categoryId: categoryId
    }
  })
}

export function listProductSpecDTOsByCategoryId(categoryId) {
  return request({
    url: '/api/product/admin/category/spec/dto/list',
    method: 'GET',
    params: {
      categoryId: categoryId
    }
  })
}

export function updateProductCategorySpecs(categoryId, productSpecIds) {
  return request({
    url: '/api/product/admin/category/spec/update/' + categoryId,
    method: 'PUT',
    data: productSpecIds
  })
}