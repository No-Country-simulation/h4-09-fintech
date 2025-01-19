import styles from "./EditProfile.module.css";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";

export default function Home() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      const response = await fetch(
        "http://localhost:5000/api/user/profile-image"
      );
      const data = await response.json();
      setProfileImage(data.imageUrl || null);
    };
    fetchProfileImage();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("url", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setProfileImage(data.imageUrl);
      } else {
        console.error("Error al subir la imagen:", data.message);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {" "}
          <a href="profile">
            <FaArrowLeft />
          </a>
          Datos financieros y personales{" "}
        </h1>

        <div className={styles.profile}>
          <div className={styles.profilePictureContainer}>
            <img
              src={
                profileImage || "https://via.placeholder.com/150?text=Perfil"
              }
              alt="Foto de perfil"
              className={styles.profilePicture}
            />

            <label htmlFor="imageUpload" className={styles.cameraIcon}>
              <FaCamera />
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.info}>
            <h3 className={styles.names}>Nombre</h3>
            <p className={styles.email}>Correo</p>
          </div>
        </div>

        <div className={styles.cardcontainer}>
          <div className={styles.card}>
            <h3>Free Plan</h3>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <h2 className={styles.subtitle}>Datos personales</h2>

        {/* <div className={styles.formContainer}>
          <div className={styles.form}>
            <label htmlFor="">Nombre completo *</label>
            <input type="text" placeholder="nombre" required />
            <button type="submit">Editar</button>

            <label htmlFor="">Correo Electronico *</label>
            <input type="email" placeholder="correo" required />

            <label htmlFor="">Contraseña * </label>
            <input type="password" placeholder="password" required />
            <button type="submit">Cambiar</button>
          </div>
        </div> */}

        <div className={styles.formContainer}>
          <div className={styles.form}>
            {/* Nombre completo */}
            <label htmlFor="name">Nombre completo *</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                id="name"
                placeholder="Carlos Narocki Vera"
                required
              />
              <a href="">Editar</a>
            </div>

            {/* Correo electrónico */}
            <label htmlFor="email">Correo electrónico *</label>
            <div className={styles.inputWithButton}>
              <input
                type="email"
                id="email"
                placeholder="carlosnarocki7@hotmail.com"
                required
              />
            </div>

            {/* Contraseña */}
            <label htmlFor="password">Contraseña *</label>
            <div className={styles.inputWithButton}>
              <input
                type="password"
                id="password"
                placeholder="************"
                required
              />
              <a href="">Cambiar</a>
            </div>
          </div>
        </div>

        <h2 className={styles.subtitle}>Tolerancia al riesgo</h2>

        <div className={styles.radiocontainer}>
          <div className={styles.radiobuttonscontainer}>
            <div className={styles.radiobuttons}>
              <div>
                <h3>Conservador:</h3>
                <p>Prefiero opciones seguras y confiables</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="riskPreference"
                  value="conservador"
                  onChange={handleChange}
                  checked={selectedOption === "conservador"}
                />
              </div>
            </div>
            <div className={styles.radiobuttons}>
              <div>
                <h3>Moderado:</h3>
                <p>Acepto la aventura para tener mejor utilidad</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="riskPreference"
                  value="moderado"
                  onChange={handleChange}
                  checked={selectedOption === "moderado"}
                />
              </div>
            </div>
            <div className={styles.radiobuttons}>
              <div>
                <h3>Arriesgado:</h3>
                <p>Asumir riesgos elevados para mayores ganacias</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="riskPreference"
                  value="arriesgado"
                  onChange={handleChange}
                  checked={selectedOption === "arriesgado"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
