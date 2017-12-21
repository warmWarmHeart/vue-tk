<template>
  <el-card>
    <div class="command-execute-wrapper" @click="click">
      <ul class="command-execute-header">
        <li class="header-item" v-for="item in historyCommand">
          <p class="header-item-command">
            {{item.command}}
          </p>
          <p class="header-item-response">
            {{item.response}}
          </p>
        </li>
      </ul>
      <div class="command-execute-textarea">
        <el-form labelPosition="left" labelWidth="100px">
          <el-form-item>
            <span slot="label" class="prefix">{{prefix + '>'}}</span>
            <textarea ref="commandTextarea" class="textarea-wrapper" v-model="command"
                      @keyup.13="textareaEnter"> </textarea>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'tk-command',
    props: {
      prefix: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        historyCommand: [],
        command: ''
      }
    },
    mounted () {
      this.click()
    },
    methods: {
      click () {
        this.$refs.commandTextarea.focus()
      },
      textareaEnter () {
        this.textareaCallback(1313)
      },
      textareaCallback (str) {
        this.historyCommand.push({
          command: this.prefix + '>  ' + this.command,
          response: str
        })
        this.command = ''
        this.click()
      }
    }
  }
</script>
<style scoped lang="scss">
  .command-execute-wrapper {
    background: #002240;
    min-height: 200px;
    padding: 20px;
    .command-execute-header {
      .header-item {
        list-style: none;
        .header-item-command {
          line-height: 30px;
          color: white;
          font-size: 14px;
        }
        .header-item-response {
          color: #68e868;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
    .command-execute-textarea {
      .prefix {
        color: white;
      }
      .textarea-wrapper {
        width: 100%;
        margin-top: 10px;
        resize: none;
        background: transparent;
        outline: none;
        border: none;
        color: #fff;
      }
    }
  }
</style>
