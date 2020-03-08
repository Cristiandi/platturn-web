<template>
  <div class="row">
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
    <div
      class="col-md-4 col-lg-3"
      v-for="company in companies"
      :key="company.id"
    >
      <div class="card">
        <img
          class="card-img-top"
          src="https://storage.googleapis.com/platturn-dev-bucket/public/companies/default-logo.png"
          alt="Card image cap"
        />
        <div class="card-body">
          <h4 class="card-title">{{ company.name }}</h4>
          <p class="card-text">
            <span class="badge badge-secondary">Código:</span>
            {{ company.code }}
            <br />
            <span class="badge badge-secondary">Documento:</span>
            {{ company.document }}
            <br />
            <span class="badge badge-secondary">Email:</span>
            {{ company.email }}
          </p>
          <a href="#" class="btn btn-primary">
            <font-awesome-icon icon="edit" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import companyService from "../../services/company.service";
import { getFromObjectPathParsed } from "../../utils/functions";
export default {
  name: "HandleCompanies",
  data() {
    return {
      companies: [],
      successful: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }

    this.loadCompanies();
  },
  methods: {
    loadCompanies() {
      companyService.getUserCompanies().then(
        data => {
          this.successful = true;

          this.companies = data;
        },
        error => {
          this.successful = false;

          this.message = getFromObjectPathParsed(
            error,
            "response.data.message"
          );

          this.message =
            this.message ||
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>
<style scoped>
.card {
  margin-top: 10px;
}
</style>