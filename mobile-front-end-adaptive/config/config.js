module.exports = {
  /**
   * 用于编译时把css的px值传为rem值，16px = 1rem; 1px = 0.0625rem
   * 用于设置html标签的fontSize值，1rem = html的fontSize值
   * 设计图的宽度一般是750，有些人喜欢用75，千万不要设为这个数，因为1px = 1/75rem ≈ 0.01333rem = 0.99975px，结果不是1px。所以这个数不能设为1除以其是个无穷数。
   */
  pxToRemRootValue: 16,
  // 设计图的宽度
  designWidth: 750,
  // 页面最大放大宽度
  pageMaxWidth: 1024
}