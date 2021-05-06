<template>
    <div class="com-page">
        <doctor></doctor>
    </div>
</template>

<script>
    import Doctor from '../components/Doctor'
    export default {
       name: "DoctorPage",
        data(){
            return {}
        },
        methods:{},
        components:{
           doctor:Doctor
        }
    }
</script>

<style scoped>

</style>