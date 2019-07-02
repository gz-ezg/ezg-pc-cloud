(function() {
  let vueBus = {}
  vueBus.install = function(Vue) {
    let bus = new Vue()
    Object.defineProperty(Vue.prototype, '$Bus', {
      get: function() {
        return bus
      },
      set: function(arg) {
        if (typeof arg === 'string') arg = [arg]
        console.log(arg)
        bus.$emit.apply(bus, arg)
      }
    })

    Vue.mixin({
      created: function() {
        let $Bus = this.$options.$Bus
        this.$busListeners = {}
        for (let name in $Bus) {
          this.$busListeners[name] = $Bus[name].bind(this)
          bus.$on(name, this.$busListeners[name])
        }
      },
      beforeDestroy: function() {
        for (let name in this.$busListeners)
          bus.$off(name, this.$busListeners[name])
        this.$busListeners = null
      }
    })
  }

  if (typeof exports === 'object') {
    module.exports = vueBus
    return
  }
})()
