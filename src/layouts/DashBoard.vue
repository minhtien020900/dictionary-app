<template>
  <v-app id="inspire">
    <Header/>
    <Content>
      <slot></slot>
    </Content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '../components/common/Header';
import Content from '../components/common/Content'
import Footer from "../components/common/Footer";
// import SideBar from "../components/common/SideBar";

export default {
  components: {
    Footer,
    Content,
    Header,

  },
  data: () => ({drawer: null}),
}
</script>