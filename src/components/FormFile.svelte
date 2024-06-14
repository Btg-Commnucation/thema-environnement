<script lang="ts">
  import axios from "axios";
  import { createForm } from "svelte-forms-lib";
  import { Link } from "svelte-routing";
  import { object, string, date, boolean } from "yup";

  const URL_API = import.meta.env.VITE_URL_API;
  let id = 412;
  let sent = false;
  let success = false;
  let error = false;



  const handlePost = async (values: { [key: string]: string }) => {
    const payload = new FormData();
    payload.set("clientName", values.clientName);
    payload.set("birthday", values.birthday);
    payload.set("phone", values.phone);
    payload.set("email", values.email);
    payload.set("street", values.street);
    payload.set("zipCode", values.zipCode);
    payload.set("town", values.town);
    payload.set("message", values.message);
    payload.set("consent", values.consent);
    payload.set("_wpcf7_unit_tag", id);

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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      clientName: "",
      birthday: "",
      phone: "",
      email: "",
      street: "",
      zipCode: "",
      town: "",
      message: "",
      consent: "",
    },
    validationSchema: object().shape({
      clientName: string().required("Veuillez renseigner votre nom"),
      birthday: date().required("Veuillez renseigner votre date de naissance"),
      phone: string()
        .matches(
          phoneRegExp,
          "Veuillez renseigner un numéro de téléphone valide"
        )
        .required("Veuillez renseigner votre numéro de téléphone"),
      email: string()
        .email("Veuillez renseigner un email valider")
        .required("Veuillez renseigner votre email"),
      street: string().required("Veuillez renseigner votre adresse"),
      zipCode: string()
        .length(5)
        .matches(/^[0-9]{5}/)
        .required("Veuillez renseigner votre code postal"),
      town: string().required("Veuillez renseigner votre ville"),
      message: string().required("Veuillez renseigner votre message"),
      consent: boolean().oneOf(
        [true],
        "Veuillez accepter les conditions d'utilisation"
      ),
    }),
    onSubmit: (values) => {
      handlePost(values);
    },
  });
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
{#key sent}
  {#if success}
    <section class="success">
      <h2>Merci, votre demande de contact nous a bien été envoyée.</h2>
      <h2>Nous revenons vers vous dans les meilleurs délais.</h2>
      <Link to="/">Retour à la page d'accueil</Link>
    </section>
  {:else}
    {#if error}
      <section class="error">
        <h2>Une erreur c'est produit, veuillez réessayer plus tard</h2>
      </section>
    {/if}
    <form on:submit={handleSubmit}>
      <div class={`field-container ${$errors.clientName ? "has-error" : ""}`}>
        <label for="clientName">Votre nom / Prénom *</label>
        <input
          id="clientName"
          name="clientName"
          on:change={handleChange}
          bind:value={$form.clientName}
          type="text"
        />
      </div>

      <div class={`field-container ${$errors.birthday ? "has-error" : ""}`}>
        <label for="birthday">Votre date de naissance *</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          on:change={handleChange}
          bind:value={$form.birthday}
        />
      </div>

      <div class={`field-container ${$errors.phone ? "has-error" : ""}`}>
        <label for="phone">Votre numéro de téléphone *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          on:change={handleChange}
          bind:value={$form.phone}
        />
      </div>

      <div class={`field-container ${$errors.email ? "has-error" : ""}`}>
        <label for="email">Votre email *</label>
        <input
          id="email"
          name="email"
          type="email"
          on:change={handleChange}
          bind:value={$form.email}
        />
      </div>

      <div class={`field-container ${$errors.street ? "has-error" : ""}`}>
        <label for="street">Votre adresse *</label>
        <input
          id="street"
          name="street"
          type="text"
          on:change={handleChange}
          bind:value={$form.street}
        />
      </div>

      <div class={`field-container ${$errors.zipCode ? "has-error" : ""}`}>
        <label for="zipCode">Votre code postal *</label>
        <input
          id="zipCode"
          name="zipCode"
          type="text"
          on:change={handleChange}
          bind:value={$form.zipCode}
        />
      </div>

      <div class={`field-container ville ${$errors.town ? "has-error" : ""}`}>
        <label for="town">Votre ville *</label>
        <input
          id="town"
          name="town"
          type="text"
          on:change={handleChange}
          bind:value={$form.town}
        />
      </div>

      <div
        class={`field-container message ${$errors.message ? "has-error" : ""}`}
      >
        <label for="message">Votre message *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          on:change={handleChange}
          bind:value={$form.message}
        />
      </div>

      <div
        class={`field-container consent ${$errors.consent ? "has-error" : ""}`}
      >
        <label>
          <input
            id="consent"
            name="consent"
            type="checkbox"
            on:change={handleChange}
            bind:value={$form.consent}
          />
          J’autorise THEMA Environnement à récolter et traiter ces données conformément
          à la politique de confidentialité *
        </label>
      </div>

      <button aria-label="Envoyer votre demande de contact" type="submit"
        >Envoyer ma demande</button
      >
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

  label {
    font-size: 2rem;
    color: var(--color-vert-deau);
    font-weight: 500;
  }

  .field-container {
    display: flex;
    flex-direction: column;
    gap: 0.7em;

    &.has-error {
      :global(input) {
        border-color: var(--color-red);
      }

      label {
        color: var(--color-red);
      }
    }

    &.consent label {
      color: var(--color-gris-fonce);
      font-size: 1.6rem;
      font-weight: 500;
    }

    @media (min-width: 768px) {
      &.ville {
        grid-column: 1 / 3;
        width: 50%;
      }

      &.message {
        grid-column: 1 / 3;
      }

      &.consent {
        grid-column: 1 / 3;
      }
    }

    @media (min-width: 1330px) {
      &.consent {
        justify-self: end;
        width: fit-content;
      }
    }
  }

  button {
    font-size: 2.4rem;
    font-weight: 500;
    color: white;
    background: var(--color-jaune);
    border: none;
    padding: 3rem;
    border-radius: 40px;

    @media (min-width: 768px) {
      justify-self: end;
      grid-column: 2 / 3;
    }
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 3.3rem;
    column-gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  :gloabel(::placeholder) {
    color: var(--color-gris);
  }

  input,
  textarea {
    border: 1px solid var(--color-vert-deau);
    border-radius: 10px;
    font-size: 2rem;
    color: var(--color-gris-fonce);
    font-weight: 500;
    padding: 0.5em 0.3em;
  }
</style>
