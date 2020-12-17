import request from "@U/request";

export function replySystemFeedback(data) {
  return request({
    url: "/system/replySystemFeedback",
    method: "post",
    data,
  });
}
// 商事员工”调整”绩效分接口
export function updateBusinessPerformanceScore(data) {
  return request({
    url: "/user/performance/updateBusinessPerformanceScore",
    method: "post",
    data,
  });
}
// 商事员工”调整”工作日接口
export function updateBusinessPerformanceWorkday(data) {
  return request({
    url: "/user/performance/updateBusinessPerformanceWorkday",
    method: "post",
    data,
  });
}
// 商事员工工作日查询接口
export function queryBusinessPerformanceWorkday(data) {
  return request({
    url: "/user/performance/queryBusinessPerformanceWorkday",
    method: "get",
    params: data,
  });
}

// 商事员工绩效分查询接口
export function queryBusinessPerformanceScore(data) {
  return request({
    url: "/user/performance/queryBusinessPerformanceScore",
    method: "get",
    params: data,
  });
}
// 根据用户ID和月份查询员工绩效信息接口
export function businessPerformanceSingle(data) {
  return request({
    url: "/user/performance/businessPerformanceSingle",
    method: "get",
    params: data,
  });
}
