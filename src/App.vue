<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app',
        mounted() {
            
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
    }

    ul, li {
        list-style: none;
    }

    a{
        text-decoration: none;
    }
</style>
