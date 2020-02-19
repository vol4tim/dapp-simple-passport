<template>
  <fragment>
    <Sidebar />
    <RLayout><slot /></RLayout>
  </fragment>
</template>

<script>
import Sidebar from "./Sidebar";

export default {
  components: {
    Sidebar
  }
};
</script>
