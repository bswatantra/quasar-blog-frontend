<template>
  <q-page padding>
    <form>
      <q-input class="q-mr-xl q-mb-xl" v-model="post.title" label="Title" />
      <q-input
        class="q-mr-xl q-mb-xl"
        v-model="post.content"
        label="description"
      />
      <q-btn
        color="primary"
        type="submit"
        label="Submit"
        v-if="isValid"
        @click.prevent="createPost(post)"
      />
      <p v-for="error in errors" :key="error">
        {{ error }}
      </p>
    </form>

    <h5>Blogs</h5>
    <q-spinner
      v-if="loading"
      class="flex flex-center"
      color="primary"
      size="3em"
      :thickness="10"
    />
    <div class="row" v-for="post in posts" :key="post.id">
      <div class="col-10">
        <span class="text-weight-bold">{{ post.title }}</span>
        <p>{{ post.content }}</p>
      </div>
      <div class="col-2">
        <q-btn class="q-mr-sm q-mb-sm" color="primary" label="Edit" />
        <q-btn
          class="q-mr-sm q-mb-sm"
          color="red"
          label="Delete"
          @click="deletePost(post)"
        />
        <q-btn class="q-mb-sm" color="secondary" label="Show" />
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Posts",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },

  computed: {
    ...mapGetters("posts", {
      posts: "posts",
    }),
    // ...mapGetters("errors", {
    //   errors: "errors",
    // }),
    // ...mapGetters("loading", {
    //   loading: "loading",
    // }),
    ...mapGetters(["errors"]),
    ...mapGetters(["loading"]),
    isValid() {
      return this.post.title !== "" && this.post.content !== "";
    },
  },
  mounted() {
    this.$store.dispatch("posts/fetchPosts");
  },
  methods: {
    createPost(post) {
      this.$store.dispatch("posts/createPost", post);
    },
    deletePost(post) {
      this.$store.dispatch("posts/deletePost", post);
    },
  },
};
</script>
