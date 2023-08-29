<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <!-- 绑定父组件传来的值 modelvalue -->
    <input :value="modelValue" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
import { showToast } from 'vant'

export default {
  props: {
    modelValue: { // 父组件的值通过 modelValue 接收，
      type: Number,
      default: 1
    },
    surplus: Number
  },
  data () {
    return {
    }
  },
  emits: ['update:model-value'],
  methods: {
    handleChange (e) {
      let resCount = +e.target.value
      if (isNaN(resCount) || resCount < 1) {
        showToast('数字不合法')
        resCount = 1
      }
      // 通过触发 update:model-value 函数实现对父组件数据的修改
      this.$emit('update:model-value', resCount)
    },
    handleAdd () {
      this.$emit('update:model-value', (this.modelValue + 1) > this.surplus ? this.surplus : (this.modelValue + 1))
    },
    handleSub () {
      this.$emit('update:model-value', (this.modelValue - 1) < 1 ? 1 : (this.modelValue - 1))
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;

  .add,
  .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }

  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
