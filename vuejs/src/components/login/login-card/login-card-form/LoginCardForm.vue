<template>
  <v-form ref="form" v-model="valid" class="pa-4" @input="emitCredentials">
    <v-text-field
      class="mb-4"
      type="text"
      :label="userLabel"
      name="user"
      prepend-icon="person"
      autocomplete="user"
      :rules="userRules"
      v-model="formValue.user"
      required
    />

    <v-text-field
      :type="passwordType"
      name="password"
      :label="passwordLabel"
      prepend-icon="lock"
      autocomplete="current-password"
      :append-icon="passwordIcon"
      :rules="passwordRules"
      @click:append="showPassword = !showPassword"
      v-model="formValue.password"
      required
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Emit } from 'vue-property-decorator';

import { Credentials } from './credentials.interface';

@Component
export default class AppLoginCardForm extends Vue {
  showPassword = false;
  valid = false;

  formValue: Credentials = {
    user: '',
    password: ''
  };

  userRules = [
      v => !!v || this.$root.$i18n.t('login.form.required', { what: this.userLabel })
  ];

  passwordRules = [
      v => !!v || this.$root.$i18n.t('login.form.required', { what: this.passwordLabel })
  ];

  get userLabel(): string {
    return this.$root.$i18n.t('login.form.user').toString();
  }
  get passwordLabel(): string {
    return this.$root.$i18n.t('login.form.password').toString();
  }

  get passwordType(): 'text' | 'password' {
    return this.showPassword ? 'text' : 'password';
  }

  get passwordIcon(): 'visibility' | 'visibility_off' {
    return this.showPassword ? 'visibility_off' : 'visibility';
  }

  get credentials(): Credentials | null {
      if (this.valid) {
          return {
              user: this.formValue.user + '@studenti.unitn.it',
              password: this.formValue.password
          };
      }
      else {
          return null;
      }
  }

  @Emit('credentials')
  emitCredentials(): Credentials | null {
    return this.credentials;
  }

  @Watch('formValue', { deep: true, immediate: true })
  watchForm(newValue: Credentials) {
    this.emitCredentials();
  }
}
</script>

<style scoped>
</style>