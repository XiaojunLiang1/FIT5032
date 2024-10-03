<template>
    <div>
        <h1>Book Counter API</h1>
        <pre>{{ jsondata }} </pre>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookCountAPI();
    },

    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-6amiscp6xa-uc.a.run.app');
                //this.count = response.data.count;
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        }
    }
}
</script>