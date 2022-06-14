<template>
  <div class="about">
    <h1 class="title">Nosotros</h1>
    <img src="/assets/flower.jpg" width="400" />
    <p class="paragraph">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel sodales
      lacus. Nam elementum posuere sapien a eleifend. Mauris lacinia tortor quis
      rutrum hendrerit. Donec id enim porta, iaculis sapien a, dignissim ligula.
      Vivamus fringilla nulla sed mi iaculis, sed semper elit tempus. Nullam
      sagittis dui at efficitur finibus. Pellentesque vestibulum ultricies diam
      vel finibus. Etiam sodales eros est, ac gravida dolor tincidunt sed. Donec
      tincidunt dolor vitae est efficitur fringilla. Fusce fermentum varius
      cursus. Nunc tincidunt odio vel nibh rutrum, rhoncus consequat lacus
      pellentesque. Praesent condimentum varius turpis a placerat. Aliquam
      congue aliquam lectus, non venenatis eros consequat ut. In id commodo
      libero. Ut a fermentum leo, interdum tempor arcu.
    </p>
    <p class="paragraph">
      Praesent lorem tellus, lacinia vel lorem a, sollicitudin finibus ligula.
      Nulla consectetur eget lacus faucibus luctus. Maecenas lorem urna, auctor
      efficitur sem non, finibus vehicula est. Nunc pretium odio neque, ut
      gravida lacus tempor non. Nunc feugiat dolor vitae porttitor ultricies.
      Nunc eu metus sit amet tortor ultricies tempor sed at leo. Sed viverra
      velit vel massa feugiat, sed varius sem suscipit. Sed vitae tincidunt leo.
      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
      inceptos himenaeos. Curabitur eu nulla ornare nisi accumsan posuere non ac
      eros. Etiam at sapien risus. Quisque nec nunc a enim finibus imperdiet.
      Nulla in est eget sapien ultricies pellentesque. Donec in enim at justo
      efficitur vestibulum. Praesent ullamcorper tempor varius.
    </p>
    <p class="paragraph">
      Donec hendrerit rutrum ipsum. Quisque eget lacus ligula. Etiam lobortis
      scelerisque massa in luctus. Mauris bibendum nunc placerat, tincidunt diam
      id, scelerisque sapien. Duis ut magna lorem. Donec ut hendrerit odio, id
      efficitur quam. Morbi eget blandit nunc. Aliquam commodo felis vel
      placerat ultrices. Vivamus interdum eget tortor et fermentum. Suspendisse
      purus massa, vulputate non tempor nec, sodales eget tortor. Duis at ligula
      volutpat, efficitur purus in, lobortis orci. Duis sem eros, euismod quis
      consectetur et, eleifend non lorem. Mauris iaculis luctus bibendum.
    </p>
    <b-button class="back shadow" href="#">
      <router-link class="button" to="/"> Volver</router-link></b-button
    >
  </div>
</template>
<script>
export default {
  name: "AboutView",
};
</script>
<style scoped lang="less">
.about {
  padding: 100px 300px;
  color: #6c757d;

  .title {
    font-size: 80px;
    font-family: "Satisfy", cursive;
  }

  .paragraph {
    font-size: 24px;
    text-align: justify;
  }

  .back {
    margin-top: 50px;

    .button {
      text-transform: uppercase;
      border: none;
      color: white;
      text-decoration: none;

      &:hover {
        background-color: #d0dede;
        font-weight: bold;
        color: #6c757d;
        border: none;
      }
    }
  }
}
</style>
