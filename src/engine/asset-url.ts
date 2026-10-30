/** 公开资源在站点根目录和静态托管的子路径下都能取到。 */
export const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
