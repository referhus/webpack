<template>
  <div></div>
</template>
<script>
    export default {
        created() {
            this.$router.push(this.$route.query.path)
        }
    }
</script>