配置控制

1. 先获取 代码配置 通过utils.filterCols 和 utils.judgeWay

  1.1 judgeWay  使用 (fileName 和 defaultConfig ) 获取代码配置的hash 和通过 fileName  判断是否已存在ucf配置文件
    1.1.1 不存在配置文件 则保存当前代码配置到ucf成为ucf配置文件 然后直接返回 代码配置
    1.1.2 存在配置文件 则拿 ucf配置文件的hash 与代码的hash比对 
      如果两值相等 则拿ucf配置文件
       如果不相等 则保存当前代码配置到ucf成为ucf配置文件 然后直接返回 代码配置
       代码如下
       var baseConfig = self.model.config
       var fileName = baseConfig.fileName
       var defaultConfig = baseConfig.defaultConfig
       var partConfig = utils.filterCols(fileName, defaultConfig)
  1.2 filterCols
    通过 judgeWay拿到配置后，筛选出未被选中 得到选中的cols且在cols项逻辑判断添加排序 返回全新配置


2. table 初始化 此处config是table配置项
        // 合并配置参数
        $.extend(config, partConfig, params)
        self.tableHandle = table.render(config)




