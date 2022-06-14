export default {
    methods: {
        getCurrency(value) {
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });
            return formatter.format(value);
    },
    getSizes(objArray) {
      var sizesList = objArray.map(function(o) {
        return o.talle;
      });
      return [ { text: "Seleccione talle", value: null }, ...sizesList];
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0
    }
  }
}