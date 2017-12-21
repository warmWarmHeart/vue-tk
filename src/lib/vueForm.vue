<template>
  <el-form :model="formModel"
           :rules="rules"
           :ref="formRef?formRef:'ruleForm'"
           :inline-message="inlineMessage"
           :status-icon="statusIcon"
           :label-width="labelWidth || '80px'"
           :label-suffix="labelSuffix"
           :show-message="showMessage"
           :size="size"
           :label-position='labelPosition'>
    <template v-for="schema in schemas">
      <template v-if="schema.slot">
        <slot :name="schema.slot"></slot>
      </template>
      <template v-else>
        <!--一行一个label，可以有多个元素 也可以只有一个元素-->
        <template v-if="schema.label">
          <el-form-item :label="schema.label"
                        :inline-message="schema.inlineMessage"
                        :rules="schema.rules"
                        :prop="schema.prop?schema.prop:schema.model"
                        :label-width="schema.labelWidth"
                        :required="schema.required"
                        :error="schema.error"
                        :gutter="schema.gutter"
                        :justify="schema.justify"
                        :align="schema.align"
                        :tag="schema.tag"
                        :show-message="schema.showMessage"
          >
            <!--多个元素-->
            <template v-if="schema.children">
              <template v-for="child in schema.children">
                <el-col :span="child.span"
                        :offset="child.offset"
                        :push="child.push"
                        :xs="child.xs"
                        :xl="child.xl"
                        :tag="child.tag || 'div'"
                        :sm="child.sm"
                        :md="child.md"
                        :lg="child.lg">
                  <template v-if="child.slot">
                    <slot :name="child.slot"></slot>
                  </template>
                  <template v-else>
                    <template v-if="!child.isText">
                      <template v-if="child.options">
                        <template v-if="child.element !== 'select'">
                          <template v-if="child.valueType === 'number'">
                            <component :is="getComponentTagName(child,'group')"
                                       @active-item-change="child.activeItemChange"
                                       :before-filter="child.beforeFilter"
                                       @blur="onEvent(  child.blur)"
                                       @change="onEvent( child.change)"
                                       :change-on-select="child.change"
                                       :clearable="child.clearable"
                                       :fill="child.fill"
                                       :debounce="child.debounce"
                                       :disabled="child.disabled"
                                       :filterable="child.filterable"
                                       :expand-trigger="child.expandTrigger"
                                       @focus="onEvent(  child.focus)"
                                       @input="onEvent( child.input)"
                                       :max="child.max"
                                       :min="child.min"
                                       :options="child.options"
                                       :props="child.props"
                                       :placeholder="child.placeholder"
                                       :separator="child.separator"
                                       :show-all-levels="child.showAllLevels"
                                       :size="child.size"
                                       :text-color="child.textColor"
                                       v-model.number="model[child.model]">
                              <template v-if="child.element !== 'cascader'">
                                <template v-for="option in child.options">
                                  <component :is="getComponentTagName(child)"
                                             :size="option.size"
                                             :type="child.valueType"
                                             :disabled="option.disabled"
                                             :checked="option.checked"
                                             :border="option.border"
                                             :name="option.name"
                                             :indeterminate="option.indeterminate"
                                             :label="option.value"
                                             :true-label="option.trueValue"
                                             :false-label="option.falseValue"
                                  >
                                    {{option.label}}
                                  </component>
                                </template>
                              </template>

                            </component>
                          </template>
                          <template v-else>
                            <component :is="getComponentTagName(child,'group')"
                                       @active-item-change="child.activeItemChange"
                                       :before-filter="child.beforeFilter"
                                       @blur="onEvent(  child.blur)"
                                       @change="onEvent( child.change)"
                                       :change-on-select="child.change"
                                       :clearable="child.clearable"
                                       :fill="child.fill"
                                       :debounce="child.debounce"
                                       :disabled="child.disabled"
                                       :filterable="child.filterable"
                                       :expand-trigger="child.expandTrigger"
                                       @focus="onEvent(  child.focus)"
                                       @input="onEvent( child.input)"
                                       :max="child.max"
                                       :min="child.min"
                                       :options="child.options"
                                       :props="child.props"
                                       :placeholder="child.placeholder"
                                       :separator="child.separator"
                                       :show-all-levels="child.showAllLevels"
                                       :size="child.size"
                                       :text-color="child.textColor"
                                       v-model.number="model[child.model]">
                              <template v-if="child.element !== 'cascader'">
                                <template v-for="option in child.options">
                                  <component :is="getComponentTagName(child)"
                                             :size="option.size"
                                             :type="child.valueType"
                                             :disabled="option.disabled"
                                             :checked="option.checked"
                                             :border="option.border"
                                             :name="option.name"
                                             :indeterminate="option.indeterminate"
                                             :label="option.value"
                                             :true-label="option.trueValue"
                                             :false-label="option.falseValue"
                                  >
                                    {{option.label}}
                                  </component>
                                </template>
                              </template>
                            </component>
                          </template>
                        </template>
                        <template v-else
                        >
                          <component is="el-select"
                                     :style="child.style || 'width:100%;'"
                                     :multiple="child.multiple"
                                     :disabled="child.disabled"
                                     :value-key="child.valueKey"
                                     :size="child.size?child.size:size"
                                     :clearable="child.clearable"
                                     :multiple-limit="child.multipleLimit"
                                     :name="child.name"
                                     :placeholder="child.placeholder"
                                     :filterabel="child.filterabel"
                                     :filter-method="child.filterMethod"
                                     :allow-create="child.allowCreate"
                                     :remote="child.remote"
                                     :remote-method="child.remoteMethod"
                                     :loading="child.loading"
                                     :loading-text="child.loadingText"
                                     :no-match-text="child.noMatchText"
                                     :no-data-text="child.noDataText"
                                     :popper-class="child.popperClass"
                                     :reserve-keyword="child.reserveKeyword"
                                     :default-first-option="child.defaultFirstOption"
                                     @change="onEvent( child.change)"
                                     @visible-change="onEvent( child.visibleChange)"
                                     @blur="onEvent(  child.blur)"
                                     @clear="onEvent(  child.clear)"
                                     @focus="onEvent(  child.focus)"
                                     v-model="model[child.model]">
                            <template v-if="child.groups">
                              <template v-for="group in child.groups">
                                <component is="el-option-group"
                                           :disabled="group.disabled"
                                           :label="group.label">
                                  <template v-for="option in group.options">
                                    <component is="el-option"
                                               :value="option.value"
                                               :disabled="option.disabled"
                                               :label="option.label">
                                    </component>
                                  </template>
                                </component>
                              </template>
                            </template>
                            <template v-else>
                              <template v-for="option in child.options">
                                <component is="el-option"
                                           :value="option.value"
                                           :disabled="option.disabled"
                                           :label="option.label">
                                </component>
                              </template>
                            </template>
                          </component>
                        </template>
                      </template>
                      <template v-else>
                        <template v-if="child.valueType === 'number'">
                          <component :is="getComponentTagName(child)"
                                     :allow-half="child.allowHalf"
                                     @active-change="child.activeChange"
                                     :active-color="child.activeColor"
                                     :active-icon-class="child.activeIconClass"
                                     :active-text="child.activeText"
                                     :active-value="child.activeValue"
                                     :aligh="child.aligh"
                                     :arrow-control="child.arrowControl"
                                     :auto-complete="child.complete"
                                     :autofocus="child.autofocus"
                                     :autosize="child.autosize"
                                     @blur="onEvent(  child.blur)"
                                     @change="onEvent( child.change)"
                                     :clearable="child.clearable"
                                     :colors="child.colors"
                                     :color-format="child.colorFormat"
                                     :controls="child.controls"
                                     :debounce="child.debounce"
                                     :default-value="child.defaultValue"
                                     :disabled="child.disabled"
                                     :disabledDate="child.disabledDate"
                                     :disabled-void-icon-class="child.disabledVoidIconClass"
                                     :disabled-void-color="child.disabledVoidColor"
                                     :editable="child.editable"
                                     :end="child.end"
                                     :end-placeholder="child.endPlaceholder"
                                     :controls-position="child.controlsPosition"
                                     :firstDayOfWeek="child.firstDayOfWeek"
                                     :fetch-suggestions="child.fetchSuggestions"
                                     :focus="child.focus"
                                     @focus="onEvent(  child.focus)"
                                     :form="child.form"
                                     :format="child.format"
                                     :format-tooltip="child.formatTooltip"
                                     :height="child.height"
                                     :height-threshold="child.heightThreshold"
                                     :icon="child.icon"
                                     :icon-classes="child.iconClasses"
                                     :inactive-color="child.inactiveColor"
                                     :inactive-icon-class="child.inactiveIconClass"
                                     :inactive-text="child.inactiveText"
                                     :inactive-value="child.inactiveValue"
                                     @input="onEvent( child.input)"
                                     :is-range="child.isRange"
                                     :label="child.message"
                                     :low-threshold="child.lowThreshold"
                                     :max="child.max"
                                     :maxTime="child.maxTime"
                                     :maxlength="child.maxlength"
                                     :minlength="child.minlength"
                                     :min="child.min"
                                     :minTime="child.minTime"
                                     :name="child.name"
                                     :onPick="child.onPick"
                                     :on-icon-click="onEvent(child.onEventMethod)"
                                     :picker-options="child.pickerOptions"
                                     :placeholder="child.placeholder"
                                     :popper-class="child.popperClass"
                                     :prefix-icon="child.prefixIcon"
                                     :props="child.props"
                                     :range="child.range"
                                     :range-separator="child.rangeSeparator"
                                     :readonly="child.readonly"
                                     :resize="child.resize"
                                     :rows="child.rows"
                                     :unlink-panels="unlinkPanels"
                                     @select="onEvent(child.select)"
                                     :selectableRange="child.selectableRange"
                                     :select-when-unmatched="child.selectWhenUnmatched"
                                     :score-template="child.scoreTemplate"
                                     :shortcuts="child.shortcuts"
                                     :show-alpha="child.showAlpha"
                                     :show-input="child.showInput"
                                     :show-input-controls="child.showInputControls"
                                     :show-score="child.showScore"
                                     :show-stops="child.showStops"
                                     :show-text="child.showText"
                                     :show-tooltip="child.showTooltip"
                                     :size="child.size?child.size:size"
                                     :start="child.start"
                                     :start-placeholder="child.startPlaceholder"
                                     :step="child.step"
                                     :style="child.style || 'width:100%;'"
                                     :suffix-icon="child.suffixIcon"
                                     :texts="child.texts"
                                     :text-color="child.textColor"
                                     :time-arrow-control="child.timeArrowControl"
                                     :trigger-on-focus="child.triggerOnfocus"
                                     :type="child.valueType"
                                     :valueKey="child.valueKey"
                                     :value="child.value"
                                     :value-format="child.valueFormat"
                                     :vertical="child.vertical"
                                     :void-color="child.voidColor"
                                     :void-icon-class="child.voidIconClass"
                                     v-model.number="model[child.model]"
                                     :width="child.width"
                          >
                          </component>
                        </template>
                        <template v-else>
                          <component :is="getComponentTagName(child)"
                                     :allow-half="child.allowHalf"
                                     @active-change="child.activeChange"
                                     :active-color="child.activeColor"
                                     :active-icon-class="child.activeIconClass"
                                     :active-text="child.activeText"
                                     :active-value="child.activeValue"
                                     :aligh="child.aligh"
                                     :arrow-control="child.arrowControl"
                                     :auto-complete="child.complete"
                                     :autofocus="child.autofocus"
                                     :autosize="child.autosize"
                                     @blur="onEvent(  child.blur)"
                                     :clearable="child.clearable"
                                     @change="onEvent( child.change)"
                                     :colors="child.colors"
                                     :color-format="child.colorFormat"
                                     :controls="child.controls"
                                     :debounce="child.debounce"
                                     :default-value="child.defaultValue"
                                     :disabled="child.disabled"
                                     :disabledDate="child.disabledDate"
                                     :disabled-void-icon-class="child.disabledVoidIconClass"
                                     :disabled-void-color="child.disabledVoidColor"
                                     :editable="child.editable"
                                     :end="child.end"
                                     :end-placeholder="child.endPlaceholder"
                                     :controls-position="child.controlsPosition"
                                     :firstDayOfWeek="child.firstDayOfWeek"
                                     :fetch-suggestions="child.fetchSuggestions"
                                     :focus="child.focus"
                                     @focus="onEvent(  child.focus)"
                                     :form="child.form"
                                     :format="child.format"
                                     :format-tooltip="child.formatTooltip"
                                     :height="child.height"
                                     :height-threshold="child.heightThreshold"
                                     :icon="child.icon"
                                     :icon-classes="child.iconClasses"
                                     :inactive-color="child.inactiveColor"
                                     :inactive-icon-class="child.inactiveIconClass"
                                     :inactive-text="child.inactiveText"
                                     :inactive-value="child.inactiveValue"
                                     @input="onEvent( child.input)"
                                     :is-range="child.isRange"
                                     :label="child.message"
                                     :low-threshold="child.lowThreshold"
                                     :max="child.max"
                                     :maxTime="child.maxTime"
                                     :maxlength="child.maxlength"
                                     :minlength="child.minlength"
                                     :min="child.min"
                                     :minTime="child.minTime"
                                     :name="child.name"
                                     :onPick="child.onPick"
                                     :on-icon-click="onEvent(child.onEventMethod)"
                                     :picker-options="child.pickerOptions"
                                     :placeholder="child.placeholder"
                                     :popper-class="child.popperClass"
                                     :prefix-icon="child.prefixIcon"
                                     :props="child.props"
                                     :range="child.range"
                                     :range-separator="child.rangeSeparator"
                                     :readonly="child.readonly"
                                     :resize="child.resize"
                                     :rows="child.rows"
                                     :unlink-panels="unlinkPanels"
                                     @select="onEvent(child.select)"
                                     :selectableRange="child.selectableRange"
                                     :select-when-unmatched="child.selectWhenUnmatched"
                                     :score-template="child.scoreTemplate"
                                     :shortcuts="child.shortcuts"
                                     :show-alpha="child.showAlpha"
                                     :show-input="child.showInput"
                                     :show-input-controls="child.showInputControls"
                                     :show-score="child.showScore"
                                     :show-stops="child.showStops"
                                     :show-text="child.showText"
                                     :show-tooltip="child.showTooltip"
                                     :size="child.size?child.size:size"
                                     :start="child.start"
                                     :start-placeholder="child.startPlaceholder"
                                     :step="child.step"
                                     :style="child.style || 'width:100%;'"
                                     :suffix-icon="child.suffixIcon"
                                     :texts="child.texts"
                                     :text-color="child.textColor"
                                     :time-arrow-control="child.timeArrowControl"
                                     :trigger-on-focus="child.triggerOnfocus"
                                     :type="child.valueType"
                                     :valueKey="child.valueKey"
                                     :value="child.value"
                                     :value-format="child.valueFormat"
                                     :vertical="child.vertical"
                                     :void-color="child.voidColor"
                                     :void-icon-class="child.voidIconClass"
                                     v-model="model[child.model]"
                                     :width="child.width">
                          </component>
                        </template>
                      </template>
                    </template>
                    <template v-else>
                      <div style="text-align: center;">
                        {{child.label}}
                      </div>
                    </template>
                  </template>
                </el-col>
              </template>
            </template>
            <!--只有一个元素-->
            <template v-else>
              <template v-if="schema.options">
                <template v-if="schema.element !== 'select'">
                  <template v-if="schema.valueType === 'number'">
                    <component :is="getComponentTagName(schema,'group')"
                               @active-item-change="schema.activeItemChange"
                               :before-filter="schema.beforeFilter"
                               @blur="onEvent(  schema.blur)"
                               @change="onEvent( schema.change)"
                               :change-on-select="schema.change"
                               :clearable="schema.clearable"
                               :fill="schema.fill"
                               :debounce="schema.debounce"
                               :disabled="schema.disabled"
                               :filterable="schema.filterable"
                               :expand-trigger="schema.expandTrigger"
                               @focus="onEvent(  schema.focus)"
                               @input="onEvent( schema.input)"
                               :max="schema.max"
                               :min="schema.min"
                               :options="schema.options"
                               :props="schema.props"
                               :placeholder="schema.placeholder"
                               :separator="schema.separator"
                               :show-all-levels="schema.showAllLevels"
                               :size="schema.size"
                               :text-color="schema.textColor"
                               v-model.number="model[schema.model]">
                      <template v-if="schema.element !== 'cascader'">
                        <template v-for="option in schema.options">
                          <component :is="getComponentTagName(schema)"
                                     :size="option.size"
                                     :type="schema.valueType"
                                     :disabled="option.disabled"
                                     :checked="option.checked"
                                     :border="option.border"
                                     :name="option.name"
                                     :indeterminate="option.indeterminate"
                                     :label="option.value"
                                     :true-label="option.trueValue"
                                     :false-label="option.falseValue"
                          >
                            {{option.label}}
                          </component>
                        </template>
                      </template>

                    </component>
                  </template>
                  <template v-else>
                    <component :is="getComponentTagName(schema,'group')"
                               @active-item-change="schema.activeItemChange"
                               :before-filter="schema.beforeFilter"
                               @blur="onEvent(  schema.blur)"
                               @change="onEvent( schema.change)"
                               :change-on-select="schema.change"
                               :clearable="schema.clearable"
                               :fill="schema.fill"
                               :debounce="schema.debounce"
                               :disabled="schema.disabled"
                               :filterable="schema.filterable"
                               :expand-trigger="schema.expandTrigger"
                               @focus="onEvent(  schema.focus)"
                               @input="onEvent( schema.input)"
                               :max="schema.max"
                               :min="schema.min"
                               :options="schema.options"
                               :props="schema.props"
                               :placeholder="schema.placeholder"
                               :separator="schema.separator"
                               :show-all-levels="schema.showAllLevels"
                               :size="schema.size"
                               :text-color="schema.textColor"
                               v-model.number="model[schema.model]">
                      <template v-if="schema.element !== 'cascader'">
                        <template v-for="option in schema.options">
                          <component :is="getComponentTagName(schema)"
                                     :size="option.size"
                                     :type="schema.valueType"
                                     :disabled="option.disabled"
                                     :checked="option.checked"
                                     :border="option.border"
                                     :name="option.name"
                                     :indeterminate="option.indeterminate"
                                     :label="option.value"
                                     :true-label="option.trueValue"
                                     :false-label="option.falseValue"
                          >
                            {{option.label}}
                          </component>
                        </template>
                      </template>
                    </component>
                  </template>
                </template>
                <template v-else
                >
                  <component is="el-select"
                             :style="schema.style || 'width:100%;'"
                             :multiple="schema.multiple"
                             :disabled="schema.disabled"
                             :value-key="schema.valueKey"
                             :size="schema.size?schema.size:size"
                             :clearable="schema.clearable"
                             :multiple-limit="schema.multipleLimit"
                             :name="schema.name"
                             :placeholder="schema.placeholder"
                             :filterabel="schema.filterabel"
                             :filter-method="schema.filterMethod"
                             :allow-create="schema.allowCreate"
                             :remote="schema.remote"
                             :remote-method="schema.remoteMethod"
                             :loading="schema.loading"
                             :loading-text="schema.loadingText"
                             :no-match-text="schema.noMatchText"
                             :no-data-text="schema.noDataText"
                             :popper-class="schema.popperClass"
                             :reserve-keyword="schema.reserveKeyword"
                             :default-first-option="schema.defaultFirstOption"
                             @change="onEvent( schema.change)"
                             @visible-change="onEvent( schema.visibleChange)"
                             @blur="onEvent(  schema.blur)"
                             @clear="onEvent(  schema.clear)"
                             @focus="onEvent(  schema.focus)"
                             v-model="model[schema.model]">
                    <template v-if="schema.groups">
                      <template v-for="group in schema.groups">
                        <component is="el-option-group"
                                   :disabled="group.disabled"
                                   :label="group.label">
                          <template v-for="option in group.options">
                            <component is="el-option"
                                       :value="option.value"
                                       :disabled="option.disabled"
                                       :label="option.label">
                            </component>
                          </template>
                        </component>
                      </template>
                    </template>
                    <template v-else>
                      <template v-for="option in schema.options">
                        <component is="el-option"
                                   :value="option.value"
                                   :disabled="option.disabled"
                                   :label="option.label">
                        </component>
                      </template>
                    </template>
                  </component>
                </template>
              </template>
              <template v-else>
                <template v-if="schema.valueType === 'number'">
                  <component :is="getComponentTagName(schema)"
                             :allow-half="schema.allowHalf"
                             @active-change="schema.activeChange"
                             :active-color="schema.activeColor"
                             :active-icon-class="schema.activeIconClass"
                             :active-text="schema.activeText"
                             :active-value="schema.activeValue"
                             :aligh="schema.aligh"
                             :arrow-control="schema.arrowControl"
                             :auto-complete="schema.complete"
                             :autofocus="schema.autofocus"
                             :autosize="schema.autosize"
                             @blur="onEvent(  schema.blur)"
                             :clearable="schema.clearable"
                             @change="onEvent( schema.change)"
                             :colors="schema.colors"
                             :color-format="schema.colorFormat"
                             :controls="schema.controls"
                             :debounce="schema.debounce"
                             :default-value="schema.defaultValue"
                             :disabled="schema.disabled"
                             :disabledDate="schema.disabledDate"
                             :disabled-void-icon-class="schema.disabledVoidIconClass"
                             :disabled-void-color="schema.disabledVoidColor"
                             :editable="schema.editable"
                             :end="schema.end"
                             :end-placeholder="schema.endPlaceholder"
                             :controls-position="schema.controlsPosition"
                             :firstDayOfWeek="schema.firstDayOfWeek"
                             :fetch-suggestions="schema.fetchSuggestions"
                             :focus="schema.focus"
                             @focus="onEvent(  schema.focus)"
                             :form="schema.form"
                             :format="schema.format"
                             :format-tooltip="schema.formatTooltip"
                             :height="schema.height"
                             :height-threshold="schema.heightThreshold"
                             :icon="schema.icon"
                             :icon-classes="schema.iconClasses"
                             :inactive-color="schema.inactiveColor"
                             :inactive-icon-class="schema.inactiveIconClass"
                             :inactive-text="schema.inactiveText"
                             :inactive-value="schema.inactiveValue"
                             @input="onEvent( schema.input)"
                             :is-range="schema.isRange"
                             :label="schema.message"
                             :low-threshold="schema.lowThreshold"
                             :max="schema.max"
                             :maxTime="schema.maxTime"
                             :maxlength="schema.maxlength"
                             :minlength="schema.minlength"
                             :min="schema.min"
                             :minTime="schema.minTime"
                             :name="schema.name"
                             :onPick="schema.onPick"
                             :on-icon-click="onEvent(schema.onEventMethod)"
                             :picker-options="schema.pickerOptions"
                             :placeholder="schema.placeholder"
                             :popper-class="schema.popperClass"
                             :prefix-icon="schema.prefixIcon"
                             :props="schema.props"
                             :range="schema.range"
                             :range-separator="schema.rangeSeparator"
                             :readonly="schema.readonly"
                             :resize="schema.resize"
                             :rows="schema.rows"
                             :unlink-panels="unlinkPanels"
                             @select="onEvent(schema.select)"
                             :selectableRange="schema.selectableRange"
                             :select-when-unmatched="schema.selectWhenUnmatched"
                             :score-template="schema.scoreTemplate"
                             :shortcuts="schema.shortcuts"
                             :show-alpha="schema.showAlpha"
                             :show-input="schema.showInput"
                             :show-input-controls="schema.showInputControls"
                             :show-score="schema.showScore"
                             :show-stops="schema.showStops"
                             :show-text="schema.showText"
                             :show-tooltip="schema.showTooltip"
                             :size="schema.size?schema.size:size"
                             :start="schema.start"
                             :start-placeholder="schema.startPlaceholder"
                             :step="schema.step"
                             :style="schema.style || 'width:100%;'"
                             :suffix-icon="schema.suffixIcon"
                             :texts="schema.texts"
                             :text-color="schema.textColor"
                             :time-arrow-control="schema.timeArrowControl"
                             :trigger-on-focus="schema.triggerOnfocus"
                             :type="schema.valueType"
                             :valueKey="schema.valueKey"
                             :value="schema.value"
                             :value-format="schema.valueFormat"
                             :vertical="schema.vertical"
                             :void-color="schema.voidColor"
                             :void-icon-class="schema.voidIconClass"
                             v-model.number="model[schema.model]"
                             :width="schema.width"
                  >
                  </component>
                </template>
                <template v-else>
                  <component :is="getComponentTagName(schema)"
                             :allow-half="schema.allowHalf"
                             @active-change="schema.activeChange"
                             :active-color="schema.activeColor"
                             :active-icon-class="schema.activeIconClass"
                             :active-text="schema.activeText"
                             :active-value="schema.activeValue"
                             :aligh="schema.aligh"
                             :arrow-control="schema.arrowControl"
                             :auto-complete="schema.complete"
                             :autofocus="schema.autofocus"
                             :autosize="schema.autosize"
                             @blur="onEvent(  schema.blur)"
                             :clearable="schema.clearable"
                             @change="onEvent( schema.change)"
                             :colors="schema.colors"
                             :color-format="schema.colorFormat"
                             :controls="schema.controls"
                             :debounce="schema.debounce"
                             :default-value="schema.defaultValue"
                             :disabled="schema.disabled"
                             :disabledDate="schema.disabledDate"
                             :disabled-void-icon-class="schema.disabledVoidIconClass"
                             :disabled-void-color="schema.disabledVoidColor"
                             :editable="schema.editable"
                             :end="schema.end"
                             :end-placeholder="schema.endPlaceholder"
                             :controls-position="schema.controlsPosition"
                             :firstDayOfWeek="schema.firstDayOfWeek"
                             :fetch-suggestions="schema.fetchSuggestions"
                             :focus="schema.focus"
                             @focus="onEvent(  schema.focus)"
                             :form="schema.form"
                             :format="schema.format"
                             :format-tooltip="schema.formatTooltip"
                             :height="schema.height"
                             :height-threshold="schema.heightThreshold"
                             :icon="schema.icon"
                             :icon-classes="schema.iconClasses"
                             :inactive-color="schema.inactiveColor"
                             :inactive-icon-class="schema.inactiveIconClass"
                             :inactive-text="schema.inactiveText"
                             :inactive-value="schema.inactiveValue"
                             @input="onEvent( schema.input)"
                             :is-range="schema.isRange"
                             :label="schema.message"
                             :low-threshold="schema.lowThreshold"
                             :max="schema.max"
                             :maxTime="schema.maxTime"
                             :maxlength="schema.maxlength"
                             :minlength="schema.minlength"
                             :min="schema.min"
                             :minTime="schema.minTime"
                             :name="schema.name"
                             :onPick="schema.onPick"
                             :on-icon-click="onEvent(schema.onEventMethod)"
                             :picker-options="schema.pickerOptions"
                             :placeholder="schema.placeholder"
                             :popper-class="schema.popperClass"
                             :prefix-icon="schema.prefixIcon"
                             :props="schema.props"
                             :range="schema.range"
                             :range-separator="schema.rangeSeparator"
                             :readonly="schema.readonly"
                             :resize="schema.resize"
                             :rows="schema.rows"
                             :unlink-panels="unlinkPanels"
                             @select="onEvent(schema.select)"
                             :selectableRange="schema.selectableRange"
                             :select-when-unmatched="schema.selectWhenUnmatched"
                             :score-template="schema.scoreTemplate"
                             :shortcuts="schema.shortcuts"
                             :show-alpha="schema.showAlpha"
                             :show-input="schema.showInput"
                             :show-input-controls="schema.showInputControls"
                             :show-score="schema.showScore"
                             :show-stops="schema.showStops"
                             :show-text="schema.showText"
                             :show-tooltip="schema.showTooltip"
                             :size="schema.size?schema.size:size"
                             :start="schema.start"
                             :start-placeholder="schema.startPlaceholder"
                             :step="schema.step"
                             :style="schema.style || 'width:100%;'"
                             :suffix-icon="schema.suffixIcon"
                             :texts="schema.texts"
                             :text-color="schema.textColor"
                             :time-arrow-control="schema.timeArrowControl"
                             :trigger-on-focus="schema.triggerOnfocus"
                             :type="schema.valueType"
                             :valueKey="schema.valueKey"
                             :value="schema.value"
                             :value-format="schema.valueFormat"
                             :vertical="schema.vertical"
                             :void-color="schema.voidColor"
                             :void-icon-class="schema.voidIconClass"
                             v-model="model[schema.model]"
                             :width="schema.width">
                  </component>
                </template>
              </template>
            </template>
          </el-form-item>
        </template>
        <!--一行有多个label，多个元素-->
        <template v-else-if="schema.children && !schema.label">
          <el-row :gutter="schema.gutter"
                  :type="schema.type"
                  :justify="schema.justify"
                  :align="schema.align"
                  :tag="schema.tag">
            <template v-for="child in schema.children">
              <el-col :span="child.span"
                      :offset="child.offset"
                      :push="child.push"
                      :xs="child.xs"
                      :xl="child.xl"
                      :tag="child.tag || 'div'"
                      :sm="child.sm"
                      :md="child.md"
                      :lg="child.lg">
                <template v-if="child.slot">
                  <slot :name="child.slot"></slot>
                </template>
                <template v-else>
                  <template v-if="child.label">
                    <el-form-item :label="child.label"
                                  :inline-message="child.inlineMessage"
                                  :rules="child.rules"
                                  :prop="child.prop?child.prop:child.model"
                                  :label-width="child.labelWidth"
                                  :required="child.required"
                                  :error="child.error"
                                  :gutter="child.gutter"
                                  :justify="child.justify"
                                  :align="child.align"
                                  :tag="child.tag"
                                  :show-message="child.showMessage">
                      <!--多个元素-->
                      <template v-if="child.children">
                        <template v-for="ch in child.children">
                          <el-col :span="ch.span"
                                  :offset="ch.offset"
                                  :push="ch.push"
                                  :xs="ch.xs"
                                  :xl="ch.xl"
                                  :tag="ch.tag || 'div'"
                                  :sm="ch.sm"
                                  :md="ch.md"
                                  :lg="ch.lg">
                            <!--需添加东西-->
                            <template v-if="ch.slot">
                              <slot :name="ch.slot"></slot>
                            </template>
                            <template v-else>
                              <template v-if="!ch.isText">
                                <template v-if="ch.options">
                                  <template v-if="ch.element !== 'select'">
                                    <template v-if="ch.valueType === 'number'">
                                      <component :is="getComponentTagName(ch,'group')"
                                                 @active-item-change="ch.activeItemChange"
                                                 :before-filter="ch.beforeFilter"
                                                 @blur="onEvent(  ch.blur)"
                                                 @change="onEvent( ch.change)"
                                                 :change-on-select="ch.change"
                                                 :clearable="ch.clearable"
                                                 :fill="ch.fill"
                                                 :debounce="ch.debounce"
                                                 :disabled="ch.disabled"
                                                 :filterable="ch.filterable"
                                                 :expand-trigger="ch.expandTrigger"
                                                 @focus="onEvent(  ch.focus)"
                                                 @input="onEvent( ch.input)"
                                                 :max="ch.max"
                                                 :min="ch.min"
                                                 :options="ch.options"
                                                 :props="ch.props"
                                                 :placeholder="ch.placeholder"
                                                 :separator="ch.separator"
                                                 :show-all-levels="ch.showAllLevels"
                                                 :size="ch.size"
                                                 :text-color="ch.textColor"
                                                 v-model.number="model[ch.model]">
                                        <template v-if="ch.element !== 'cascader'">
                                          <template v-for="option in ch.options">
                                            <component :is="getComponentTagName(ch)"
                                                       :size="option.size"
                                                       :type="ch.valueType"
                                                       :disabled="option.disabled"
                                                       :checked="option.checked"
                                                       :border="option.border"
                                                       :name="option.name"
                                                       :indeterminate="option.indeterminate"
                                                       :label="option.value"
                                                       :true-label="option.trueValue"
                                                       :false-label="option.falseValue"
                                            >
                                              {{option.label}}
                                            </component>
                                          </template>
                                        </template>

                                      </component>
                                    </template>
                                    <template v-else>
                                      <component :is="getComponentTagName(ch,'group')"
                                                 @active-item-change="ch.activeItemChange"
                                                 :before-filter="ch.beforeFilter"
                                                 @blur="onEvent(  ch.blur)"
                                                 @change="onEvent( ch.change)"
                                                 :change-on-select="ch.change"
                                                 :clearable="ch.clearable"
                                                 :fill="ch.fill"
                                                 :debounce="ch.debounce"
                                                 :disabled="ch.disabled"
                                                 :filterable="ch.filterable"
                                                 :expand-trigger="ch.expandTrigger"
                                                 @focus="onEvent(  ch.focus)"
                                                 @input="onEvent( ch.input)"
                                                 :max="ch.max"
                                                 :min="ch.min"
                                                 :options="ch.options"
                                                 :props="ch.props"
                                                 :placeholder="ch.placeholder"
                                                 :separator="ch.separator"
                                                 :show-all-levels="ch.showAllLevels"
                                                 :size="ch.size"
                                                 :text-color="ch.textColor"
                                                 v-model.number="model[ch.model]">
                                        <template v-if="ch.element !== 'cascader'">
                                          <template v-for="option in ch.options">
                                            <component :is="getComponentTagName(ch)"
                                                       :size="option.size"
                                                       :type="ch.valueType"
                                                       :disabled="option.disabled"
                                                       :checked="option.checked"
                                                       :border="option.border"
                                                       :name="option.name"
                                                       :indeterminate="option.indeterminate"
                                                       :label="option.value"
                                                       :true-label="option.trueValue"
                                                       :false-label="option.falseValue"
                                            >
                                              {{option.label}}
                                            </component>
                                          </template>
                                        </template>
                                      </component>
                                    </template>
                                  </template>
                                  <template v-else
                                  >
                                    <component is="el-select"
                                               :style="ch.style || 'width:100%;'"
                                               :multiple="ch.multiple"
                                               :disabled="ch.disabled"
                                               :value-key="ch.valueKey"
                                               :size="ch.size?ch.size:size"
                                               :clearable="ch.clearable"
                                               :multiple-limit="ch.multipleLimit"
                                               :name="ch.name"
                                               :placeholder="ch.placeholder"
                                               :filterabel="ch.filterabel"
                                               :filter-method="ch.filterMethod"
                                               :allow-create="ch.allowCreate"
                                               :remote="ch.remote"
                                               :remote-method="ch.remoteMethod"
                                               :loading="ch.loading"
                                               :loading-text="ch.loadingText"
                                               :no-match-text="ch.noMatchText"
                                               :no-data-text="ch.noDataText"
                                               :popper-class="ch.popperClass"
                                               :reserve-keyword="ch.reserveKeyword"
                                               :default-first-option="ch.defaultFirstOption"
                                               @change="onEvent( ch.change)"
                                               @visible-change="onEvent( ch.visibleChange)"
                                               @blur="onEvent(  ch.blur)"
                                               @clear="onEvent(  ch.clear)"
                                               @focus="onEvent(  ch.focus)"
                                               v-model="model[ch.model]">
                                      <template v-if="ch.groups">
                                        <template v-for="group in ch.groups">
                                          <component is="el-option-group"
                                                     :disabled="group.disabled"
                                                     :label="group.label">
                                            <template v-for="option in group.options">
                                              <component is="el-option"
                                                         :value="option.value"
                                                         :disabled="option.disabled"
                                                         :label="option.label">
                                              </component>
                                            </template>
                                          </component>
                                        </template>
                                      </template>
                                      <template v-else>
                                        <template v-for="option in ch.options">
                                          <component is="el-option"
                                                     :value="option.value"
                                                     :disabled="option.disabled"
                                                     :label="option.label">
                                          </component>
                                        </template>
                                      </template>
                                    </component>
                                  </template>
                                </template>
                                <template v-else>
                                  <template v-if="ch.valueType === 'number'">
                                    <component :is="getComponentTagName(child)"
                                               :allow-half="ch.allowHalf"
                                               @active-change="ch.activeChange"
                                               :active-color="ch.activeColor"
                                               :active-icon-class="ch.activeIconClass"
                                               :active-text="ch.activeText"
                                               :active-value="ch.activeValue"
                                               :aligh="ch.aligh"
                                               :arrow-control="ch.arrowControl"
                                               :auto-complete="ch.complete"
                                               :autofocus="ch.autofocus"
                                               :autosize="ch.autosize"
                                               @blur="onEvent(  ch.blur)"
                                               @change="onEvent( ch.change)"
                                               :clearable="ch.clearable"
                                               :colors="ch.colors"
                                               :color-format="ch.colorFormat"
                                               :controls="ch.controls"
                                               :debounce="ch.debounce"
                                               :default-value="ch.defaultValue"
                                               :disabled="ch.disabled"
                                               :disabledDate="ch.disabledDate"
                                               :disabled-void-icon-class="ch.disabledVoidIconClass"
                                               :disabled-void-color="ch.disabledVoidColor"
                                               :editable="ch.editable"
                                               :end="ch.end"
                                               :end-placeholder="ch.endPlaceholder"
                                               :controls-position="ch.controlsPosition"
                                               :firstDayOfWeek="ch.firstDayOfWeek"
                                               :fetch-suggestions="ch.fetchSuggestions"
                                               :focus="ch.focus"
                                               @focus="onEvent(  ch.focus)"
                                               :form="ch.form"
                                               :format="ch.format"
                                               :format-tooltip="ch.formatTooltip"
                                               :height="ch.height"
                                               :height-threshold="ch.heightThreshold"
                                               :icon="ch.icon"
                                               :icon-classes="ch.iconClasses"
                                               :inactive-color="ch.inactiveColor"
                                               :inactive-icon-class="ch.inactiveIconClass"
                                               :inactive-text="ch.inactiveText"
                                               :inactive-value="ch.inactiveValue"
                                               @input="onEvent( ch.input)"
                                               :is-range="ch.isRange"
                                               :label="ch.message"
                                               :low-threshold="ch.lowThreshold"
                                               :max="ch.max"
                                               :maxTime="ch.maxTime"
                                               :maxlength="ch.maxlength"
                                               :minlength="ch.minlength"
                                               :min="ch.min"
                                               :minTime="ch.minTime"
                                               :name="ch.name"
                                               :onPick="ch.onPick"
                                               :on-icon-click="onEvent(ch.onEventMethod)"
                                               :picker-options="ch.pickerOptions"
                                               :placeholder="ch.placeholder"
                                               :popper-class="ch.popperClass"
                                               :prefix-icon="ch.prefixIcon"
                                               :props="ch.props"
                                               :range="ch.range"
                                               :range-separator="ch.rangeSeparator"
                                               :readonly="ch.readonly"
                                               :resize="ch.resize"
                                               :rows="ch.rows"
                                               :unlink-panels="unlinkPanels"
                                               @select="onEvent(ch.select)"
                                               :selectableRange="ch.selectableRange"
                                               :select-when-unmatched="ch.selectWhenUnmatched"
                                               :score-template="ch.scoreTemplate"
                                               :shortcuts="ch.shortcuts"
                                               :show-alpha="ch.showAlpha"
                                               :show-input="ch.showInput"
                                               :show-input-controls="ch.showInputControls"
                                               :show-score="ch.showScore"
                                               :show-stops="ch.showStops"
                                               :show-text="ch.showText"
                                               :show-tooltip="ch.showTooltip"
                                               :size="ch.size?ch.size:size"
                                               :start="ch.start"
                                               :start-placeholder="ch.startPlaceholder"
                                               :step="ch.step"
                                               :style="ch.style || 'width:100%;'"
                                               :suffix-icon="ch.suffixIcon"
                                               :texts="ch.texts"
                                               :text-color="ch.textColor"
                                               :time-arrow-control="ch.timeArrowControl"
                                               :trigger-on-focus="ch.triggerOnfocus"
                                               :type="ch.valueType"
                                               :valueKey="ch.valueKey"
                                               :value="ch.value"
                                               :value-format="ch.valueFormat"
                                               :vertical="ch.vertical"
                                               :void-color="ch.voidColor"
                                               :void-icon-class="ch.voidIconClass"
                                               v-model.number="model[ch.model]"
                                               :width="ch.width"
                                    >
                                    </component>
                                  </template>
                                  <template v-else>
                                    <component :is="getComponentTagName(child)"
                                               :allow-half="ch.allowHalf"
                                               @active-change="ch.activeChange"
                                               :active-color="ch.activeColor"
                                               :active-icon-class="ch.activeIconClass"
                                               :active-text="ch.activeText"
                                               :active-value="ch.activeValue"
                                               :aligh="ch.aligh"
                                               :arrow-control="ch.arrowControl"
                                               :auto-complete="ch.complete"
                                               :autofocus="ch.autofocus"
                                               :autosize="ch.autosize"
                                               @blur="onEvent(  ch.blur)"
                                               :clearable="ch.clearable"
                                               @change="onEvent( ch.change)"
                                               :colors="ch.colors"
                                               :color-format="ch.colorFormat"
                                               :controls="ch.controls"
                                               :debounce="ch.debounce"
                                               :default-value="ch.defaultValue"
                                               :disabled="ch.disabled"
                                               :disabledDate="ch.disabledDate"
                                               :disabled-void-icon-class="ch.disabledVoidIconClass"
                                               :disabled-void-color="ch.disabledVoidColor"
                                               :editable="ch.editable"
                                               :end="ch.end"
                                               :end-placeholder="ch.endPlaceholder"
                                               :controls-position="ch.controlsPosition"
                                               :firstDayOfWeek="ch.firstDayOfWeek"
                                               :fetch-suggestions="ch.fetchSuggestions"
                                               :focus="ch.focus"
                                               @focus="onEvent(  ch.focus)"
                                               :form="ch.form"
                                               :format="ch.format"
                                               :format-tooltip="ch.formatTooltip"
                                               :height="ch.height"
                                               :height-threshold="ch.heightThreshold"
                                               :icon="ch.icon"
                                               :icon-classes="ch.iconClasses"
                                               :inactive-color="ch.inactiveColor"
                                               :inactive-icon-class="ch.inactiveIconClass"
                                               :inactive-text="ch.inactiveText"
                                               :inactive-value="ch.inactiveValue"
                                               @input="onEvent( ch.input)"
                                               :is-range="ch.isRange"
                                               :label="ch.message"
                                               :low-threshold="ch.lowThreshold"
                                               :max="ch.max"
                                               :maxTime="ch.maxTime"
                                               :maxlength="ch.maxlength"
                                               :minlength="ch.minlength"
                                               :min="ch.min"
                                               :minTime="ch.minTime"
                                               :name="ch.name"
                                               :onPick="ch.onPick"
                                               :on-icon-click="onEvent(ch.onEventMethod)"
                                               :picker-options="ch.pickerOptions"
                                               :placeholder="ch.placeholder"
                                               :popper-class="ch.popperClass"
                                               :prefix-icon="ch.prefixIcon"
                                               :props="ch.props"
                                               :range="ch.range"
                                               :range-separator="ch.rangeSeparator"
                                               :readonly="ch.readonly"
                                               :resize="ch.resize"
                                               :rows="ch.rows"
                                               :unlink-panels="unlinkPanels"
                                               @select="onEvent(ch.select)"
                                               :selectableRange="ch.selectableRange"
                                               :select-when-unmatched="ch.selectWhenUnmatched"
                                               :score-template="ch.scoreTemplate"
                                               :shortcuts="ch.shortcuts"
                                               :show-alpha="ch.showAlpha"
                                               :show-input="ch.showInput"
                                               :show-input-controls="ch.showInputControls"
                                               :show-score="ch.showScore"
                                               :show-stops="ch.showStops"
                                               :show-text="ch.showText"
                                               :show-tooltip="ch.showTooltip"
                                               :size="ch.size?ch.size:size"
                                               :start="ch.start"
                                               :start-placeholder="ch.startPlaceholder"
                                               :step="ch.step"
                                               :style="ch.style || 'width:100%;'"
                                               :suffix-icon="ch.suffixIcon"
                                               :texts="ch.texts"
                                               :text-color="ch.textColor"
                                               :time-arrow-control="ch.timeArrowControl"
                                               :trigger-on-focus="ch.triggerOnfocus"
                                               :type="ch.valueType"
                                               :valueKey="ch.valueKey"
                                               :value="ch.value"
                                               :value-format="ch.valueFormat"
                                               :vertical="ch.vertical"
                                               :void-color="ch.voidColor"
                                               :void-icon-class="ch.voidIconClass"
                                               v-model="model[ch.model]"
                                               :width="ch.width">
                                    </component>
                                  </template>
                                </template>
                              </template>
                              <template v-else>
                                <div style="text-align: center;">
                                  {{ch.label}}
                                </div>
                              </template>
                            </template>
                          </el-col>
                        </template>
                      </template>
                      <!--只有一个元素-->
                      <template v-else>
                        <template v-if="child.options">
                          <template v-if="child.element !== 'select'">
                            <template v-if="child.valueType === 'number'">
                              <component :is="getComponentTagName(child,'group')"
                                         @active-item-change="child.activeItemChange"
                                         :before-filter="child.beforeFilter"
                                         @blur="onEvent(  child.blur)"
                                         @change="onEvent( child.change)"
                                         :change-on-select="child.change"
                                         :clearable="child.clearable"
                                         :fill="child.fill"
                                         :debounce="child.debounce"
                                         :disabled="child.disabled"
                                         :filterable="child.filterable"
                                         :expand-trigger="child.expandTrigger"
                                         @focus="onEvent(  child.focus)"
                                         @input="onEvent( child.input)"
                                         :max="child.max"
                                         :min="child.min"
                                         :options="child.options"
                                         :props="child.props"
                                         :placeholder="child.placeholder"
                                         :separator="child.separator"
                                         :show-all-levels="child.showAllLevels"
                                         :size="child.size"
                                         :text-color="child.textColor"
                                         v-model.number="model[child.model]">
                                <template v-if="child.element !== 'cascader'">
                                  <template v-for="option in child.options">
                                    <component :is="getComponentTagName(child)"
                                               :size="option.size"
                                               :type="child.valueType"
                                               :disabled="option.disabled"
                                               :checked="option.checked"
                                               :border="option.border"
                                               :name="option.name"
                                               :indeterminate="option.indeterminate"
                                               :label="option.value"
                                               :true-label="option.trueValue"
                                               :false-label="option.falseValue"
                                    >
                                      {{option.label}}
                                    </component>
                                  </template>
                                </template>

                              </component>
                            </template>
                            <template v-else>
                              <component :is="getComponentTagName(child,'group')"
                                         @active-item-change="child.activeItemChange"
                                         :before-filter="child.beforeFilter"
                                         @blur="onEvent(  child.blur)"
                                         @change="onEvent( child.change)"
                                         :change-on-select="child.change"
                                         :clearable="child.clearable"
                                         :fill="child.fill"
                                         :debounce="child.debounce"
                                         :disabled="child.disabled"
                                         :filterable="child.filterable"
                                         :expand-trigger="child.expandTrigger"
                                         @focus="onEvent(  child.focus)"
                                         @input="onEvent( child.input)"
                                         :max="child.max"
                                         :min="child.min"
                                         :options="child.options"
                                         :props="child.props"
                                         :placeholder="child.placeholder"
                                         :separator="child.separator"
                                         :show-all-levels="child.showAllLevels"
                                         :size="child.size"
                                         :text-color="child.textColor"
                                         v-model.number="model[child.model]">
                                <template v-if="child.element !== 'cascader'">
                                  <template v-for="option in child.options">
                                    <component :is="getComponentTagName(child)"
                                               :size="option.size"
                                               :type="child.valueType"
                                               :disabled="option.disabled"
                                               :checked="option.checked"
                                               :border="option.border"
                                               :name="option.name"
                                               :indeterminate="option.indeterminate"
                                               :label="option.value"
                                               :true-label="option.trueValue"
                                               :false-label="option.falseValue"
                                    >
                                      {{option.label}}
                                    </component>
                                  </template>
                                </template>
                              </component>
                            </template>
                          </template>
                          <template v-else
                          >
                            <component is="el-select"
                                       :style="child.style || 'width:100%;'"
                                       :multiple="child.multiple"
                                       :disabled="child.disabled"
                                       :value-key="child.valueKey"
                                       :size="child.size?child.size:size"
                                       :clearable="child.clearable"
                                       :multiple-limit="child.multipleLimit"
                                       :name="child.name"
                                       :placeholder="child.placeholder"
                                       :filterabel="child.filterabel"
                                       :filter-method="child.filterMethod"
                                       :allow-create="child.allowCreate"
                                       :remote="child.remote"
                                       :remote-method="child.remoteMethod"
                                       :loading="child.loading"
                                       :loading-text="child.loadingText"
                                       :no-match-text="child.noMatchText"
                                       :no-data-text="child.noDataText"
                                       :popper-class="child.popperClass"
                                       :reserve-keyword="child.reserveKeyword"
                                       :default-first-option="child.defaultFirstOption"
                                       @change="onEvent( child.change)"
                                       @visible-change="onEvent( child.visibleChange)"
                                       @blur="onEvent(  child.blur)"
                                       @clear="onEvent(  child.clear)"
                                       @focus="onEvent(  child.focus)"
                                       v-model="model[child.model]">
                              <template v-if="child.groups">
                                <template v-for="group in child.groups">
                                  <component is="el-option-group"
                                             :disabled="group.disabled"
                                             :label="group.label">
                                    <template v-for="option in group.options">
                                      <component is="el-option"
                                                 :value="option.value"
                                                 :disabled="option.disabled"
                                                 :label="option.label">
                                      </component>
                                    </template>
                                  </component>
                                </template>
                              </template>
                              <template v-else>
                                <template v-for="option in child.options">
                                  <component is="el-option"
                                             :value="option.value"
                                             :disabled="option.disabled"
                                             :label="option.label">
                                  </component>
                                </template>
                              </template>
                            </component>
                          </template>
                        </template>
                        <template v-else-if="child.slot">
                          <slot :name="child.slot"></slot>
                        </template>
                        <template v-else>
                          <template v-if="child.valueType === 'number'">
                            <component :is="getComponentTagName(child)"
                                       :allow-half="child.allowHalf"
                                       @active-change="child.activeChange"
                                       :active-color="child.activeColor"
                                       :active-icon-class="child.activeIconClass"
                                       :active-text="child.activeText"
                                       :active-value="child.activeValue"
                                       :aligh="child.aligh"
                                       :arrow-control="child.arrowControl"
                                       :auto-complete="child.complete"
                                       :autofocus="child.autofocus"
                                       :autosize="child.autosize"
                                       @blur="onEvent(  child.blur)"
                                       :clearable="child.clearable"
                                       @change="onEvent( child.change)"
                                       :colors="child.colors"
                                       :color-format="child.colorFormat"
                                       :controls="child.controls"
                                       :debounce="child.debounce"
                                       :default-value="child.defaultValue"
                                       :disabled="child.disabled"
                                       :disabledDate="child.disabledDate"
                                       :disabled-void-icon-class="child.disabledVoidIconClass"
                                       :disabled-void-color="child.disabledVoidColor"
                                       :editable="child.editable"
                                       :end="child.end"
                                       :end-placeholder="child.endPlaceholder"
                                       :controls-position="child.controlsPosition"
                                       :firstDayOfWeek="child.firstDayOfWeek"
                                       :fetch-suggestions="child.fetchSuggestions"
                                       :focus="child.focus"
                                       @focus="onEvent(  child.focus)"
                                       :form="child.form"
                                       :format="child.format"
                                       :format-tooltip="child.formatTooltip"
                                       :height="child.height"
                                       :height-threshold="child.heightThreshold"
                                       :icon="child.icon"
                                       :icon-classes="child.iconClasses"
                                       :inactive-color="child.inactiveColor"
                                       :inactive-icon-class="child.inactiveIconClass"
                                       :inactive-text="child.inactiveText"
                                       :inactive-value="child.inactiveValue"
                                       @input="onEvent( child.input)"
                                       :is-range="child.isRange"
                                       :label="child.message"
                                       :low-threshold="child.lowThreshold"
                                       :max="child.max"
                                       :maxTime="child.maxTime"
                                       :maxlength="child.maxlength"
                                       :minlength="child.minlength"
                                       :min="child.min"
                                       :minTime="child.minTime"
                                       :name="child.name"
                                       :onPick="child.onPick"
                                       :on-icon-click="onEvent(child.onEventMethod)"
                                       :picker-options="child.pickerOptions"
                                       :placeholder="child.placeholder"
                                       :popper-class="child.popperClass"
                                       :prefix-icon="child.prefixIcon"
                                       :props="child.props"
                                       :range="child.range"
                                       :range-separator="child.rangeSeparator"
                                       :readonly="child.readonly"
                                       :resize="child.resize"
                                       :rows="child.rows"
                                       :unlink-panels="unlinkPanels"
                                       @select="onEvent(child.select)"
                                       :selectableRange="child.selectableRange"
                                       :select-when-unmatched="child.selectWhenUnmatched"
                                       :score-template="child.scoreTemplate"
                                       :shortcuts="child.shortcuts"
                                       :show-alpha="child.showAlpha"
                                       :show-input="child.showInput"
                                       :show-input-controls="child.showInputControls"
                                       :show-score="child.showScore"
                                       :show-stops="child.showStops"
                                       :show-text="child.showText"
                                       :show-tooltip="child.showTooltip"
                                       :size="child.size?child.size:size"
                                       :start="child.start"
                                       :start-placeholder="child.startPlaceholder"
                                       :step="child.step"
                                       :style="child.style || 'width:100%;'"
                                       :suffix-icon="child.suffixIcon"
                                       :texts="child.texts"
                                       :text-color="child.textColor"
                                       :time-arrow-control="child.timeArrowControl"
                                       :trigger-on-focus="child.triggerOnfocus"
                                       :type="child.valueType"
                                       :valueKey="child.valueKey"
                                       :value="child.value"
                                       :value-format="child.valueFormat"
                                       :vertical="child.vertical"
                                       :void-color="child.voidColor"
                                       :void-icon-class="child.voidIconClass"
                                       v-model.number="model[child.model]"
                                       :width="child.width"
                            >
                            </component>
                          </template>
                          <template v-else>
                            <component :is="getComponentTagName(child)"
                                       :allow-half="child.allowHalf"
                                       @active-change="child.activeChange"
                                       :active-color="child.activeColor"
                                       :active-icon-class="child.activeIconClass"
                                       :active-text="child.activeText"
                                       :active-value="child.activeValue"
                                       :aligh="child.aligh"
                                       :arrow-control="child.arrowControl"
                                       :auto-complete="child.complete"
                                       :autofocus="child.autofocus"
                                       :autosize="child.autosize"
                                       @blur="onEvent(  child.blur)"
                                       :clearable="child.clearable"
                                       @change="onEvent( child.change)"
                                       :colors="child.colors"
                                       :color-format="child.colorFormat"
                                       :controls="child.controls"
                                       :debounce="child.debounce"
                                       :default-value="child.defaultValue"
                                       :disabled="child.disabled"
                                       :disabledDate="child.disabledDate"
                                       :disabled-void-icon-class="child.disabledVoidIconClass"
                                       :disabled-void-color="child.disabledVoidColor"
                                       :editable="child.editable"
                                       :end="child.end"
                                       :end-placeholder="child.endPlaceholder"
                                       :controls-position="child.controlsPosition"
                                       :firstDayOfWeek="child.firstDayOfWeek"
                                       :fetch-suggestions="child.fetchSuggestions"
                                       :focus="child.focus"
                                       @focus="onEvent(  child.focus)"
                                       :form="child.form"
                                       :format="child.format"
                                       :format-tooltip="child.formatTooltip"
                                       :height="child.height"
                                       :height-threshold="child.heightThreshold"
                                       :icon="child.icon"
                                       :icon-classes="child.iconClasses"
                                       :inactive-color="child.inactiveColor"
                                       :inactive-icon-class="child.inactiveIconClass"
                                       :inactive-text="child.inactiveText"
                                       :inactive-value="child.inactiveValue"
                                       @input="onEvent( child.input)"
                                       :is-range="child.isRange"
                                       :label="child.message"
                                       :low-threshold="child.lowThreshold"
                                       :max="child.max"
                                       :maxTime="child.maxTime"
                                       :maxlength="child.maxlength"
                                       :minlength="child.minlength"
                                       :min="child.min"
                                       :minTime="child.minTime"
                                       :name="child.name"
                                       :onPick="child.onPick"
                                       :on-icon-click="onEvent(child.onEventMethod)"
                                       :picker-options="child.pickerOptions"
                                       :placeholder="child.placeholder"
                                       :popper-class="child.popperClass"
                                       :prefix-icon="child.prefixIcon"
                                       :props="child.props"
                                       :range="child.range"
                                       :range-separator="child.rangeSeparator"
                                       :readonly="child.readonly"
                                       :resize="child.resize"
                                       :rows="child.rows"
                                       :unlink-panels="unlinkPanels"
                                       @select="onEvent(child.select)"
                                       :selectableRange="child.selectableRange"
                                       :select-when-unmatched="child.selectWhenUnmatched"
                                       :score-template="child.scoreTemplate"
                                       :shortcuts="child.shortcuts"
                                       :show-alpha="child.showAlpha"
                                       :show-input="child.showInput"
                                       :show-input-controls="child.showInputControls"
                                       :show-score="child.showScore"
                                       :show-stops="child.showStops"
                                       :show-text="child.showText"
                                       :show-tooltip="child.showTooltip"
                                       :size="child.size?child.size:size"
                                       :start="child.start"
                                       :start-placeholder="child.startPlaceholder"
                                       :step="child.step"
                                       :style="child.style || 'width:100%;'"
                                       :suffix-icon="child.suffixIcon"
                                       :texts="child.texts"
                                       :text-color="child.textColor"
                                       :time-arrow-control="child.timeArrowControl"
                                       :trigger-on-focus="child.triggerOnfocus"
                                       :type="child.valueType"
                                       :valueKey="child.valueKey"
                                       :value="child.value"
                                       :value-format="child.valueFormat"
                                       :vertical="child.vertical"
                                       :void-color="child.voidColor"
                                       :void-icon-class="child.voidIconClass"
                                       v-model="model[child.model]"
                                       :width="child.width">
                            </component>
                          </template>
                        </template>
                      </template>
                    </el-form-item>
                  </template>
                  <template v-else-if="!child.label && child.children">
                    <template v-for="ch in child.children">
                      <el-col :span="ch.span"
                              :offset="ch.offset"
                              :push="ch.push"
                              :xs="ch.xs"
                              :xl="ch.xl"
                              :tag="ch.tag || 'div'"
                              :sm="ch.sm"
                              :md="ch.md"
                              :lg="ch.lg">
                        <template v-if="ch.slot">
                          <slot :name="ch.slot"></slot>
                        </template>
                        <template v-else>
                          <template v-if="!ch.isText">
                            <template v-if="ch.options">
                              <template v-if="ch.element !== 'select'">
                                <template v-if="ch.valueType === 'number'">
                                  <component :is="getComponentTagName(ch,'group')"
                                             @active-item-change="ch.activeItemChange"
                                             :before-filter="ch.beforeFilter"
                                             @blur="onEvent(  ch.blur)"
                                             @change="onEvent( ch.change)"
                                             :change-on-select="ch.change"
                                             :clearable="ch.clearable"
                                             :fill="ch.fill"
                                             :debounce="ch.debounce"
                                             :disabled="ch.disabled"
                                             :filterable="ch.filterable"
                                             :expand-trigger="ch.expandTrigger"
                                             @focus="onEvent(  ch.focus)"
                                             @input="onEvent( ch.input)"
                                             :max="ch.max"
                                             :min="ch.min"
                                             :options="ch.options"
                                             :props="ch.props"
                                             :placeholder="ch.placeholder"
                                             :separator="ch.separator"
                                             :show-all-levels="ch.showAllLevels"
                                             :size="ch.size"
                                             :text-color="ch.textColor"
                                             v-model.number="model[ch.model]">
                                    <template v-if="ch.element !== 'cascader'">
                                      <template v-for="option in ch.options">
                                        <component :is="getComponentTagName(ch)"
                                                   :size="option.size"
                                                   :type="ch.valueType"
                                                   :disabled="option.disabled"
                                                   :checked="option.checked"
                                                   :border="option.border"
                                                   :name="option.name"
                                                   :indeterminate="option.indeterminate"
                                                   :label="option.value"
                                                   :true-label="option.trueValue"
                                                   :false-label="option.falseValue"
                                        >
                                          {{option.label}}
                                        </component>
                                      </template>
                                    </template>

                                  </component>
                                </template>
                                <template v-else>
                                  <component :is="getComponentTagName(ch,'group')"
                                             @active-item-change="ch.activeItemChange"
                                             :before-filter="ch.beforeFilter"
                                             @blur="onEvent(  ch.blur)"
                                             @change="onEvent( ch.change)"
                                             :change-on-select="ch.change"
                                             :clearable="ch.clearable"
                                             :fill="ch.fill"
                                             :debounce="ch.debounce"
                                             :disabled="ch.disabled"
                                             :filterable="ch.filterable"
                                             :expand-trigger="ch.expandTrigger"
                                             @focus="onEvent(  ch.focus)"
                                             @input="onEvent( ch.input)"
                                             :max="ch.max"
                                             :min="ch.min"
                                             :options="ch.options"
                                             :props="ch.props"
                                             :placeholder="ch.placeholder"
                                             :separator="ch.separator"
                                             :show-all-levels="ch.showAllLevels"
                                             :size="ch.size"
                                             :text-color="ch.textColor"
                                             v-model.number="model[ch.model]">
                                    <template v-if="ch.element !== 'cascader'">
                                      <template v-for="option in ch.options">
                                        <component :is="getComponentTagName(ch)"
                                                   :size="option.size"
                                                   :type="ch.valueType"
                                                   :disabled="option.disabled"
                                                   :checked="option.checked"
                                                   :border="option.border"
                                                   :name="option.name"
                                                   :indeterminate="option.indeterminate"
                                                   :label="option.value"
                                                   :true-label="option.trueValue"
                                                   :false-label="option.falseValue"
                                        >
                                          {{option.label}}
                                        </component>
                                      </template>
                                    </template>
                                  </component>
                                </template>
                              </template>
                              <template v-else
                              >
                                <component is="el-select"
                                           :style="ch.style || 'width:100%;'"
                                           :multiple="ch.multiple"
                                           :disabled="ch.disabled"
                                           :value-key="ch.valueKey"
                                           :size="ch.size?ch.size:size"
                                           :clearable="ch.clearable"
                                           :multiple-limit="ch.multipleLimit"
                                           :name="ch.name"
                                           :placeholder="ch.placeholder"
                                           :filterabel="ch.filterabel"
                                           :filter-method="ch.filterMethod"
                                           :allow-create="ch.allowCreate"
                                           :remote="ch.remote"
                                           :remote-method="ch.remoteMethod"
                                           :loading="ch.loading"
                                           :loading-text="ch.loadingText"
                                           :no-match-text="ch.noMatchText"
                                           :no-data-text="ch.noDataText"
                                           :popper-class="ch.popperClass"
                                           :reserve-keyword="ch.reserveKeyword"
                                           :default-first-option="ch.defaultFirstOption"
                                           @change="onEvent( ch.change)"
                                           @visible-change="onEvent( ch.visibleChange)"
                                           @blur="onEvent(  ch.blur)"
                                           @clear="onEvent(  ch.clear)"
                                           @focus="onEvent(  ch.focus)"
                                           v-model="model[ch.model]">
                                  <template v-if="ch.groups">
                                    <template v-for="group in ch.groups">
                                      <component is="el-option-group"
                                                 :disabled="group.disabled"
                                                 :label="group.label">
                                        <template v-for="option in group.options">
                                          <component is="el-option"
                                                     :value="option.value"
                                                     :disabled="option.disabled"
                                                     :label="option.label">
                                          </component>
                                        </template>
                                      </component>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <template v-for="option in ch.options">
                                      <component is="el-option"
                                                 :value="option.value"
                                                 :disabled="option.disabled"
                                                 :label="option.label">
                                      </component>
                                    </template>
                                  </template>
                                </component>
                              </template>
                            </template>
                            <template v-else>
                              <template v-if="ch.valueType === 'number'">
                                <component :is="getComponentTagName(ch)"
                                           :allow-half="ch.allowHalf"
                                           @active-change="ch.activeChange"
                                           :active-color="ch.activeColor"
                                           :active-icon-class="ch.activeIconClass"
                                           :active-text="ch.activeText"
                                           :active-value="ch.activeValue"
                                           :aligh="ch.aligh"
                                           :arrow-control="ch.arrowControl"
                                           :auto-complete="ch.complete"
                                           :autofocus="ch.autofocus"
                                           :autosize="ch.autosize"
                                           @blur="onEvent(  ch.blur)"
                                           @change="onEvent( ch.change)"
                                           :clearable="ch.clearable"
                                           :colors="ch.colors"
                                           :color-format="ch.colorFormat"
                                           :controls="ch.controls"
                                           :debounce="ch.debounce"
                                           :default-value="ch.defaultValue"
                                           :disabled="ch.disabled"
                                           :disabledDate="ch.disabledDate"
                                           :disabled-void-icon-class="ch.disabledVoidIconClass"
                                           :disabled-void-color="ch.disabledVoidColor"
                                           :editable="ch.editable"
                                           :end="ch.end"
                                           :end-placeholder="ch.endPlaceholder"
                                           :controls-position="ch.controlsPosition"
                                           :firstDayOfWeek="ch.firstDayOfWeek"
                                           :fetch-suggestions="ch.fetchSuggestions"
                                           :focus="ch.focus"
                                           @focus="onEvent(  ch.focus)"
                                           :form="ch.form"
                                           :format="ch.format"
                                           :format-tooltip="ch.formatTooltip"
                                           :height="ch.height"
                                           :height-threshold="ch.heightThreshold"
                                           :icon="ch.icon"
                                           :icon-classes="ch.iconClasses"
                                           :inactive-color="ch.inactiveColor"
                                           :inactive-icon-class="ch.inactiveIconClass"
                                           :inactive-text="ch.inactiveText"
                                           :inactive-value="ch.inactiveValue"
                                           @input="onEvent( ch.input)"
                                           :is-range="ch.isRange"
                                           :label="ch.message"
                                           :low-threshold="ch.lowThreshold"
                                           :max="ch.max"
                                           :maxTime="ch.maxTime"
                                           :maxlength="ch.maxlength"
                                           :minlength="ch.minlength"
                                           :min="ch.min"
                                           :minTime="ch.minTime"
                                           :name="ch.name"
                                           :onPick="ch.onPick"
                                           :on-icon-click="onEvent(ch.onEventMethod)"
                                           :picker-options="ch.pickerOptions"
                                           :placeholder="ch.placeholder"
                                           :popper-class="ch.popperClass"
                                           :prefix-icon="ch.prefixIcon"
                                           :props="ch.props"
                                           :range="ch.range"
                                           :range-separator="ch.rangeSeparator"
                                           :readonly="ch.readonly"
                                           :resize="ch.resize"
                                           :rows="ch.rows"
                                           :unlink-panels="unlinkPanels"
                                           @select="onEvent(ch.select)"
                                           :selectableRange="ch.selectableRange"
                                           :select-when-unmatched="ch.selectWhenUnmatched"
                                           :score-template="ch.scoreTemplate"
                                           :shortcuts="ch.shortcuts"
                                           :show-alpha="ch.showAlpha"
                                           :show-input="ch.showInput"
                                           :show-input-controls="ch.showInputControls"
                                           :show-score="ch.showScore"
                                           :show-stops="ch.showStops"
                                           :show-text="ch.showText"
                                           :show-tooltip="ch.showTooltip"
                                           :size="ch.size?ch.size:size"
                                           :start="ch.start"
                                           :start-placeholder="ch.startPlaceholder"
                                           :step="ch.step"
                                           :style="ch.style || 'width:100%;'"
                                           :suffix-icon="ch.suffixIcon"
                                           :texts="ch.texts"
                                           :text-color="ch.textColor"
                                           :time-arrow-control="ch.timeArrowControl"
                                           :trigger-on-focus="ch.triggerOnfocus"
                                           :type="ch.valueType"
                                           :valueKey="ch.valueKey"
                                           :value="ch.value"
                                           :value-format="ch.valueFormat"
                                           :vertical="ch.vertical"
                                           :void-color="ch.voidColor"
                                           :void-icon-class="ch.voidIconClass"
                                           v-model.number="model[ch.model]"
                                           :width="ch.width"
                                >
                                </component>
                              </template>
                              <template v-else>
                                <component :is="getComponentTagName(ch)"
                                           :allow-half="ch.allowHalf"
                                           @active-change="ch.activeChange"
                                           :active-color="ch.activeColor"
                                           :active-icon-class="ch.activeIconClass"
                                           :active-text="ch.activeText"
                                           :active-value="ch.activeValue"
                                           :aligh="ch.aligh"
                                           :arrow-control="ch.arrowControl"
                                           :auto-complete="ch.complete"
                                           :autofocus="ch.autofocus"
                                           :autosize="ch.autosize"
                                           @blur="onEvent(  ch.blur)"
                                           :clearable="ch.clearable"
                                           @change="onEvent( ch.change)"
                                           :colors="ch.colors"
                                           :color-format="ch.colorFormat"
                                           :controls="ch.controls"
                                           :debounce="ch.debounce"
                                           :default-value="ch.defaultValue"
                                           :disabled="ch.disabled"
                                           :disabledDate="ch.disabledDate"
                                           :disabled-void-icon-class="ch.disabledVoidIconClass"
                                           :disabled-void-color="ch.disabledVoidColor"
                                           :editable="ch.editable"
                                           :end="ch.end"
                                           :end-placeholder="ch.endPlaceholder"
                                           :controls-position="ch.controlsPosition"
                                           :firstDayOfWeek="ch.firstDayOfWeek"
                                           :fetch-suggestions="ch.fetchSuggestions"
                                           :focus="ch.focus"
                                           @focus="onEvent(  ch.focus)"
                                           :form="ch.form"
                                           :format="ch.format"
                                           :format-tooltip="ch.formatTooltip"
                                           :height="ch.height"
                                           :height-threshold="ch.heightThreshold"
                                           :icon="ch.icon"
                                           :icon-classes="ch.iconClasses"
                                           :inactive-color="ch.inactiveColor"
                                           :inactive-icon-class="ch.inactiveIconClass"
                                           :inactive-text="ch.inactiveText"
                                           :inactive-value="ch.inactiveValue"
                                           @input="onEvent( ch.input)"
                                           :is-range="ch.isRange"
                                           :label="ch.message"
                                           :low-threshold="ch.lowThreshold"
                                           :max="ch.max"
                                           :maxTime="ch.maxTime"
                                           :maxlength="ch.maxlength"
                                           :minlength="ch.minlength"
                                           :min="ch.min"
                                           :minTime="ch.minTime"
                                           :name="ch.name"
                                           :onPick="ch.onPick"
                                           :on-icon-click="onEvent(ch.onEventMethod)"
                                           :picker-options="ch.pickerOptions"
                                           :placeholder="ch.placeholder"
                                           :popper-class="ch.popperClass"
                                           :prefix-icon="ch.prefixIcon"
                                           :props="ch.props"
                                           :range="ch.range"
                                           :range-separator="ch.rangeSeparator"
                                           :readonly="ch.readonly"
                                           :resize="ch.resize"
                                           :rows="ch.rows"
                                           :unlink-panels="unlinkPanels"
                                           @select="onEvent(ch.select)"
                                           :selectableRange="ch.selectableRange"
                                           :select-when-unmatched="ch.selectWhenUnmatched"
                                           :score-template="ch.scoreTemplate"
                                           :shortcuts="ch.shortcuts"
                                           :show-alpha="ch.showAlpha"
                                           :show-input="ch.showInput"
                                           :show-input-controls="ch.showInputControls"
                                           :show-score="ch.showScore"
                                           :show-stops="ch.showStops"
                                           :show-text="ch.showText"
                                           :show-tooltip="ch.showTooltip"
                                           :size="ch.size?ch.size:size"
                                           :start="ch.start"
                                           :start-placeholder="ch.startPlaceholder"
                                           :step="ch.step"
                                           :style="ch.style || 'width:100%;'"
                                           :suffix-icon="ch.suffixIcon"
                                           :texts="ch.texts"
                                           :text-color="ch.textColor"
                                           :time-arrow-control="ch.timeArrowControl"
                                           :trigger-on-focus="ch.triggerOnfocus"
                                           :type="ch.valueType"
                                           :valueKey="ch.valueKey"
                                           :value="ch.value"
                                           :value-format="ch.valueFormat"
                                           :vertical="ch.vertical"
                                           :void-color="ch.voidColor"
                                           :void-icon-class="ch.voidIconClass"
                                           v-model="model[ch.model]"
                                           :width="ch.width">
                                </component>
                              </template>
                            </template>
                          </template>
                          <template v-else>
                            <div style="text-align: center;">
                              {{ch.label}}
                            </div>
                          </template>
                        </template>
                      </el-col>
                    </template>
                  </template>
                </template>
              </el-col>
            </template>
          </el-row>
        </template>
      </template>
    </template>
    <template v-if="buttonData">
      <el-form-item>
        <template v-for="button in buttonData">
          <template v-if="!button.style">
            <el-button :type="button.type"
                       :size="button.size"
                       :icon="button.icon"
                       @click="button.method"
            >
              {{button.label}}
            </el-button>
          </template>
          <template v-else>
            <div class="el-btn" style="display: block;width: 100%;">
              <el-button :type="button.type"
                         :size="button.size"
                         :icon="button.icon"
                         @click="button.method"
                         style="width: 100%"
              >
                {{button.label}}
              </el-button>
            </div>
          </template>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
  export default {
    name: 'tk-vue',
    data () {
      return {
        formModel: {},
        resetModel: {},
        formSchemas: []
      }
    },
    created () {
      this.resetModel = JSON.parse(JSON.stringify(this.model))
      this.formModel = this.model
    },
    props: {
      model: {
        type: Object,
        default () {
          return {}
        }
      },
      rules: Object,
      size: String,
      inlineMessage: {
        type: Boolean,
        default: false
      },
      statusIcon: {
        type: Boolean,
        default: false
      },
      labelSuffix: String,
      showMessage: {type: Boolean, default: true},
      ShowDefaultButton: {type: Boolean, default: true},
      schemas: Array,
      buttonData: Array,
      labelWidth: String,
      labelPosition: {type: String, default: 'left'},
      formRef: String,
      formKey: String,
      storeAction: {
        type: String,
        default () {
          return ''
        }
      },
      editAction: {
        type: String,
        default () {
          return ''
        }
      }
    },
    methods: {
      getComponentTagName (schema, group) {
        if (group === 'group') {
          return 'el-' + schema.element + '-group'
        }
        if (schema.isButton) {
          return 'el-' + schema.element + '-button'
        }
        return 'el-' + schema.element
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formModel['type'] = this.type
            this.$store.dispatch(this.storeAction, this.formModel).then(
              this.success,
              this.failed
            )
          } else {
            this.$message('有内容未填写，请填写完整')
          }
        })
      },
      onEvent (methodName) {
        if (methodName) {
          this.$parent[methodName]()
        }
      },
      resetForm () {
        this.$emit('resetModel', {ref: this.formRef, model: this.resetModel})
        if (this.$parent['resetModel']) {
          this.$parent['resetModel']()
        }
      },
      cancel () {
        this.$emit('cancel')
      },
      success () {
        this.$emit('submitSuccess')
      },
      failed () {
        console.log('create failed')
      },
      buttonClickEvent (name, event) {
        if (name) {
          this.$parent[name]()
        } else {
          console.error('未定义该button的' + name + '方法')
        }
      }
    }
  }
</script>
