<script>
  // @ts-nocheck

  import { createForm } from "svelte-forms-lib";
  import { object, string, date, mixed, boolean } from "yup";

  const schema = object().shape({
    nomPrenom: string().required("Le nom et prénom sont requis"),
    dateNaissance: date().required("La date de naissance est requise"),
    telephone: string().required("Le numéro de téléphone est requis"),
    email: string()
      .email("L'email est invalide")
      .required("L'email est requis"),
    adresse: string().required("L'adresse est requise"),
    codePostal: string().required("Le code postal est requis"),
    ville: string().required("La ville est requise"),
    message: string().required("Le message est requis"),
    cv: mixed().test("fileSize", "Le fichier est trop volumineux", (value) => {
      if (!value) return true;
      return value.size <= 5000000;
    }),
    autreDocument: mixed().test(
      "fileSize",
      "Le fichier est trop volumineux",
      (value) => {
        if (!value) return true;
        return value.size <= 5000000;
      }
    ),
    rgpd: boolean().oneOf([true], "Vous devez accepter la RGPD"),
  });

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      nomPrenom: "",
      dateNaissance: "",
      telephone: "",
      email: "",
      adresse: "",
      codePostal: "",
      ville: "",
      message: "",
      cv: null,
      autreDocument: null,
      rgpd: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
</script>

<h3>Proposer votre candidature</h3>
<!-- svelte-ignore a11y-label-has-associated-control -->

<form on:submit={handleSubmit}>
  <div>
    <label>Votre nom / prénom *</label>
    <input
      class={errors.nomPrenom && "error"}
      type="text"
      id="nomPrenom"
      name="nomPrenom"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.nomPrenom}
    />
  </div>

  <div>
    <label for="dateNaissance">Votre date de naissance *</label>
    <input
      class={errors.dateNaissance && "error"}
      type="date"
      id="dateNaissance"
      name="dateNaissance"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.daneNaissance}
    />
  </div>

  <div>
    <label for="telephone">Votre numéro de téléphone *</label>
    <input
      class={errors.telephone && "error"}
      type="tel"
      id="telephone"
      name="telephone"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.telephone}
    />
  </div>

  <div>
    <label for="email">Votre email *</label>
    <input
      class={errors.email && "error"}
      type="email"
      id="email"
      name="email"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.email}
    />
  </div>

  <div>
    <label for="adresse">Votre adresse *</label>
    <input
      class={errors.adresse && "error"}
      type="text"
      id="adresse"
      name="adresse"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.adresse}
    />
  </div>

  <div>
    <label for="codePostal">Votre code postal *</label>
    <input
      class={errors.codePostal && "error"}
      type="text"
      id="codePostal"
      name="codePostal"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.codePostal}
    />
  </div>

  <div>
    <label for="ville">Votre ville *</label>
    <input
      class={errors.ville && "error"}
      type="text"
      id="ville"
      name="ville"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.ville}
    />
  </div>

  <div>
    <label for="message">Votre message *</label>
    <textarea
      class={errors.message && "error"}
      type="textarea"
      id="message"
      name="message"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.message}
    />
  </div>

  <div>
    <label for="cv">Télécharger votre CV</label>
    <input
      class={errors.cv && "error"}
      type="file"
      id="cv"
      name="cv"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.cv}
    />
  </div>

  <div>
    <label for="autreDocument">Autre document</label>
    <input
      class={errors.autreDocument && "error"}
      type="file"
      id="autreDocument"
      name="autreDocument"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.autreDocument}
    />
  </div>

  <div>
    <label>
      <input
        class={errors.rgpd && "error"}
        type="checkbox"
        name="rgpd"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.rgpd}
      />
      J'accepte la RGPD
    </label>
  </div>

  <button type="submit">Envoyer ma candidature</button>
</form>

<style lang="scss">
  h3 {
    font-size: 2rem;
    color: var(--color-vert-deau);
    text-align: center;
    font-weight: 500;
  }
</style>
