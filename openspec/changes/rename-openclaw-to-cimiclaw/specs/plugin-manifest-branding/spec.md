## ADDED Requirements

### Requirement: 插件清单文件名为 cimiclaw.plugin.json
系统 SHALL 使用 `cimiclaw.plugin.json` 作为插件清单文件名。`src/plugins/manifest.ts` 中 `PLUGIN_MANIFEST_FILENAME` 的值 SHALL 为 `"cimiclaw.plugin.json"`。`src/plugins/manifest-metadata-scan.ts` 中独立硬编码的同名常量 SHALL 同步更新。

#### Scenario: 插件加载器查找清单文件
- **WHEN** 插件加载器扫描某个插件目录
- **THEN** 查找名为 `cimiclaw.plugin.json` 的清单文件

#### Scenario: 插件清单文件名导出常量
- **WHEN** 其他模块 import `PLUGIN_MANIFEST_FILENAME`
- **THEN** 获得的值为 `"cimiclaw.plugin.json"`

### Requirement: 所有插件目录中的物理清单文件重命名
`extensions/` 下所有 `openclaw.plugin.json` 文件 SHALL 重命名为 `cimiclaw.plugin.json`。

#### Scenario: 扩展目录中无 openclaw.plugin.json 残留
- **WHEN** 在 `extensions/` 目录下搜索 `openclaw.plugin.json`
- **THEN** 零匹配结果

### Requirement: 测试和文档中的插件清单文件名引用更新
所有测试文件和文档中引用 `openclaw.plugin.json` 的字符串 SHALL 替换为 `cimiclaw.plugin.json`。

#### Scenario: 测试中引用新清单文件名
- **WHEN** 测试代码构造插件路径
- **THEN** 使用 `cimiclaw.plugin.json` 作为清单文件名

### Requirement: 文档示例中的清单文件名更新
`docs/snippets/plugin-publish/minimal-openclaw.plugin.json` SHALL 重命名为 `minimal-cimiclaw.plugin.json`。其内容中的 `openclaw.plugin.json` 引用也 SHALL 更新。

#### Scenario: 插件发布文档示例
- **WHEN** 用户阅读插件发布文档
- **THEN** 示例中展示的清单文件名为 `cimiclaw.plugin.json`
