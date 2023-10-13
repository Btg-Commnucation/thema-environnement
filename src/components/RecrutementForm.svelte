<script lang="ts">
  import axios from "axios";
  import { createForm } from "svelte-forms-lib";
  import { Link } from "svelte-routing";
  import { object, string, date, mixed, boolean } from "yup";

  const URL_API = import.meta.env.VITE_URL_API;
  const id = 454;
  let sent = false;
  let success = false;
  let error = false;

  let otherDocument = "Autre document";
  let cvName = "Télécharger votre CV";

  const handlePost = async (value: {
    nomPrenom: string;
    dateNaissance: string;
    telephone: string;
    email: string;
    adresse: string;
    codePostal: string;
    ville: string;
    message: string;
    cv: FileList | null;
    autreDocument: FileList | null;
    rgpd: boolean;
  }) => {
    const payload = new FormData();
    payload.set("nomPrenom", value.nomPrenom);
    payload.set("dateNaissance", value.dateNaissance);
    payload.set("telephone", value.telephone);
    payload.set("email", value.email);
    payload.set("adresse", value.adresse);
    payload.set("codePostal", value.codePostal);
    payload.set("ville", value.ville);
    payload.set("message", value.message);
    if (value.cv && value.cv.length > 0) {
      payload.append("cv", value.cv[0]);
    }
    if (value.autreDocument && value.autreDocument.length > 0) {
      payload.append("autreDocument", value.autreDocument[0]);
    }
    payload.set("rgpd", value.rgpd.toString());

    try {
      const response = await axios.post(
        `${URL_API}/contact-form-7/v1/contact-forms/${id}/feedback`,
        payload
      );
      if (response.status === 200) {
        sent = true;
        success = true;
      } else {
        sent = true;
        error = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      cv: mixed().test(
        "fileSize",
        "Le fichier est trop volumineux",
        (value) => {
          if (!value) return false;
          if (value instanceof FileList && value.length > 0) {
            if (value[0].size <= 5000000) {
              cvName = value[0].name;
              return true;
            }
          }
          return false;
        }
      ),
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
      handlePost(values);
    },
  });
</script>

{#key sent}
  {#if success}
    <section class="success">
      <h2>Merci, votre candidature nous a bien été envoyée.</h2>
      <h2>Nous revenons vers vous dans les meilleurs délais.</h2>
      <Link to="/">Retour à la page d'accueil</Link>
    </section>
  {:else}
    {#if error}
      <section class="error">
        <h2>Une erreur c'est produit, veuillez réessayer plus tard</h2>
      </section>
    {/if}
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
          class={$errors.autreDocument
            ? "error document file"
            : "document file"}
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
          Fichiers acceptés (maximum de 5 mo): <br /> PDF, DOC, DOCX, XLS, XLSX,
          PPT, PPTX.
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
  {/if}
{/key}

<style lang="scss">
  .error {
    margin-bottom: 2em;
    h2 {
      color: var(--color-red);
      font-size: 2.8rem;
      text-align: center;
      line-height: 1.3;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 3.2rem;
      }
    }
  }

  .success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 2em;

    h2 {
      color: var(--color-vert-deau);
      font-size: 2.8rem;
      text-align: center;
      line-height: 1.3;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 3.2rem;
      }
    }

    :global(a) {
      background: var(--color-jaune);
      border: 1px solid var(--color-jaune);
      color: white;
      border-radius: 4rem;
      font-size: 2rem;
      padding: 1.5rem 3rem;
      line-height: 1.3;
      margin-top: 5.6rem;
      transition: 0.3s ease-in-out;

      &:hover {
        background: transparent;
        color: var(--color-jaune);
      }

      @media (min-width: 1330px) {
        font-size: 2.4rem;
        padding: 3rem;
      }
    }
  }
  button {
    color: white;
    background: var(--color-jaune);
    border: 1px solid var(--color-jaune);
    border-radius: 40px;
    padding: 2rem 3rem;
    align-self: end;

    @media (min-width: 768px) {
      padding: 2rem 3rem;
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

  small {
    margin-top: 1rem;

    @media (min-width: 768px) {
      margin-top: 0 !important;
    }
  }

  form {
    margin-top: 2.2rem;
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
      margin-top: 5.8rem;
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
