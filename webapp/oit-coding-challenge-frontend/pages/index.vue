<template>
  <!-- Stealing the tutorial page template >:) -->
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
      <h2 class="text-2xl leading-7 font-semibold">
        Movie Lookup
      </h2>
      <p class="mt-3 text-gray-600">
        <!-- We recommend you take a look at the <a href="https://nuxtjs.org" target="_blank" class="button--doc text-green-500 hover:underline">Nuxt Documentation</a>, whether you are new or have previous experience with the framework.<br> -->
        Input a title in the search bar and click on the magnifying glass to search.
      </p>
      <p class="mt-4 pt-4 text-gray-800 border-t border-dashed">
        <!-- To get started, remove <code class="bg-gray-100 text-sm p-1 rounded border">components/Tutorial.vue</code> and start coding in <code class="bg-gray-100 text-sm p-1 rounded border">pages/index.vue</code>. Have fun! -->
        
        <img src="../assets/Vector_search_icon.svg.png" alt="Search Icon" style="width:25px;height:30
        px;" @click="getMovies('filler')">
      </p>
      <!-- <li v-for="(item, index) in items">
  	    {{ parentMessage }} - {{ index }} - {{ item.message }}
	    </li> -->
      <div v-if = "responseAvailable == true">
        <hr>
        <p>
            <i>{{result}}</i>
        </p>
        <hr>
</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
  	return {
	    result: " ",
      responseAvailable: false,
      searchQuery: " ",
  	}
	},
  methods: {
    getMovies(query) {
      console.log(query);
      this.responseAvailable = false;
      // This is likely bad practice to specify the query inline like this
      fetch(`http://localhost:8080/movies?search=${query}`, {
        "method": "GET",
      }).then(response => {
        if(response.ok) {
          alert("Success! Response: " + response.json)
          let movie = response.json();
          movie = movie[0];
          console.log(response.json())
          return response.json()
        } else{
          alert("Server returned " + response.status + " : " + response.statusText);
        }
      }).then(response => {
        this.result = response.body;
        this.responseAvailable = true
      })
    }
  }
}

</script>
