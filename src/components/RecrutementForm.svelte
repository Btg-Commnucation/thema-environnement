<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { object, string, date, mixed, boolean } from "yup";

  let otherDocument = "Autre document";
  let cvName = "Télécharger votre CV";

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
    validationSchema: object().shape({
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
      cv: mixed()
        .test("fileSize", "Le fichier est trop volumineux", (value) => {
          if (!value) return false;
          if (value instanceof FileList && value.length > 0) {
            if (value[0].size <= 5000000) {
              cvName = value[0].name;
              return true;
            }
          }
          return false;
        })
        .required("Le CV est requis"),
      autreDocument: mixed().test(
        "fileSize",
        "Le fichier est trop volumineux",
        (value) => {
          if (!value) return true;
          if (value instanceof FileList && value.length === 0) return true;
          if (value instanceof FileList && value.length > 0) {
            if (value[0].size <= 5000000) {
              otherDocument = value[0].name;
              return true;
            }
          }
        }
      ),
      rgpd: boolean().oneOf([true], "Vous devez accepter la RGPD"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
</script>

<h3>Proposer votre candidature</h3>
<!-- svelte-ignore a11y-label-has-associated-control -->

<form on:submit={handleSubmit}>
  <div class={$errors.nomPrenom && "error"}>
    <label for="nomPrenom">Votre nom / prénom *</label>
    <input
      type="text"
      id="nomPrenom"
      name="nomPrenom"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.nomPrenom}
    />
  </div>

  <div class={$errors.dateNaissance && "error"}>
    <label for="dateNaissance">Votre date de naissance *</label>
    <input
      type="date"
      id="dateNaissance"
      name="dateNaissance"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.dateNaissance}
    />
  </div>

  <div class={$errors.telephone && "error"}>
    <label for="telephone">Votre numéro de téléphone *</label>
    <input
      type="tel"
      id="telephone"
      name="telephone"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.telephone}
    />
  </div>

  <div class={$errors.email && "error"}>
    <label for="email">Votre email *</label>
    <input
      type="email"
      id="email"
      name="email"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.email}
    />
  </div>

  <div class={$errors.adresse && "error"}>
    <label for="adresse">Votre adresse *</label>
    <input
      type="text"
      id="adresse"
      name="adresse"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.adresse}
    />
  </div>

  <div class={$errors.codePostal && "error"}>
    <label for="codePostal">Votre code postal *</label>
    <input
      type="text"
      id="codePostal"
      name="codePostal"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.codePostal}
    />
  </div>

  <div class={$errors.ville ? "error ville" : "ville"}>
    <label for="ville">Votre ville *</label>
    <input
      type="text"
      id="ville"
      name="ville"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.ville}
    />
  </div>

  <div class={$errors.message ? "error message" : "message"}>
    <label for="message">Votre message *</label>
    <textarea
      rows="10"
      id="message"
      name="message"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.message}
    />
  </div>

  <div class="files-container">
    <div class={$errors.cv ? "error cv file" : "cv file"}>
      <label for="cv">{cvName}</label>
      <input
        type="file"
        id="cv"
        name="cv"
        accept=".pdf, .doc, .docs. .xls. .xlsx, .ppt, .pptx"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.cv}
      />
    </div>
    <div
      class={$errors.autreDocument ? "error document file" : "document file"}
    >
      <label for="autreDocument">{otherDocument}</label>
      <input
        type="file"
        id="autreDocument"
        name="autreDocument"
        on:change={handleChange}
        on:blur={handleChange}
        bind:value={$form.autreDocument}
      />
    </div>
    <small>
      Fichiers acceptés (maximum de 5 mo): <br /> PDF, DOC, DOCX, XLS, XLSX, PPT,
      PPTX.
    </small>
  </div>

  <div class={$errors.rgpd ? "error rgpd" : "rgpd"}>
    <input
      type="checkbox"
      name="rgpd"
      id="rgpd"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.rgpd}
    />
    <label for="rgpd">
      J'accepte Théma environnement à récolter et traiter ces données
      conformément à la politique de confidentialité
    </label>
  </div>

  <button type="submit">Envoyer ma candidature</button>
</form>

<style lang="scss">
  button {
    color: white;
    background: var(--color-jaune);
    border: 1px solid var(--color-jaune);
    border-radius: 40px;
    padding: 2rem 3rem;
    align-self: end;

    @media (min-width: 768px) {
      padding: 3rem;
      font-size: 2rem;
      grid-column: 1 / 3;
      width: fit-content;
      align-self: center;
      justify-self: end;
    }
  }

  .files-container {
    @media (min-width: 768px) {
      grid-column: 1 / 3;
      display: grid;
      grid-template-columns: 0.7fr 1fr;
      row-gap: 1.9rem;
      gap: 2.3rem;
    }

    @media (min-width: 1330px) {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
    }
  }

  .rgpd {
    flex-direction: row;
    gap: 0.1em;

    @media (min-width: 768px) {
      grid-column: 1 / 3;
    }

    @media (min-width: 1330px) {
      justify-self: end;
      justify-content: end;
    }

    label {
      color: var(--color-gris);
    }

    input {
      width: fit-content;
      margin-top: 0.3em;
    }
  }

  h3 {
    font-size: 2rem;
    color: var(--color-vert-deau);
    text-align: center;
    font-weight: 500;
  }

  small {
    @media (min-width: 768px) {
      font-size: 1.6rem;
    }
  }

  .error {
    label {
      color: var(--color-red);
    }

    input,
    textarea {
      border-color: var(--color-red);
    }
  }

  .ville {
    @media (min-width: 768px) {
      grid-column: 1 / 3;
      width: 48%;
    }
  }

  .message {
    @media (min-width: 768px) {
      grid-column: 1 / 3;
    }
  }

  .file {
    position: relative;
    background: var(--color-vert-deau);
    border-radius: 45px;
    padding: 2rem 3rem;
    pointer-events: none;
    width: fit-content;
    height: fit-content;

    &.error {
      background: var(--color-red);
    }

    label {
      color: white;
      font-weight: 300;
      pointer-events: none;
      display: flex;
      justify-content: start;
      gap: 2em;
      align-items: center;
      width: 100%;

      @media (min-width: 1330px) {
        font-size: 2rem;
      }

      &::after {
        content: "";
        background: url("/icone-telechargement.svg") no-repeat;
        width: 18.84px;
        height: 25.36px;
      }
    }

    input {
      position: absolute;
      color: transparent;
      border: none;
      width: 100%;
      pointer-events: all;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;

      ::placeholder {
        display: none;
      }
    }
  }

  input,
  textarea {
    border: 1px solid var(--color-vert-deau);
    border-radius: 10px;
    font-size: 2rem;
    color: var(--color-gris);
    font-weight: 500;
    padding: 1.1em 0.3em;
    width: 100%;
  }

  ::placeholder {
    color: var(--color-gris);
  }

  form {
    margin-top: 5.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1em;
    margin-bottom: 7.2rem;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
      row-gap: 3.6rem;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 0.7em;
      width: 100%;
    }
  }

  label {
    color: var(--color-vert-deau);
    font-weight: 500;

    @media (min-width: 1330px) {
      font-size: 2rem;
    }
  }
</style>
