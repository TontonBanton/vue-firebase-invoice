import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InvoiceView from "../views/InvoiceView.vue";
import FormInvoice from "@/components/FormInvoice.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView},
  { path: "/invoice/:invoiceId", name: "InvoiceView", component: InvoiceView},
  { path: "/trial", name: "FormInvoice", component: FormInvoice}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router