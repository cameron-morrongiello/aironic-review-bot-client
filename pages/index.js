import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/page.module.css";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const inputValue = e.target.link.value;
    // Clear form
    e.target.reset();
    // Make API request here with the input value
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({ input: inputValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response as needed
      if (response.ok) {
        // Success
        console.log("Form submitted successfully");
        setIsSuccess(true);
      } else {
        // Error
        console.log("Error submitting form: ", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>A.I.ronic Review Request</title>
        <meta name="description" content="Beep boop." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={`${styles.container} ${inter.className}`}>
        <nav className={styles.navbar}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="AIronicReview robot logo."
            width={64}
            height={64}
          />
          <h1>A.I.ronic Review Requests</h1>
        </nav>

        {!isSucces ? (
          <div className={styles.content}>
            <p className={styles["text-center"]}>
              Submit any Amzazon product link and{" "}
              <span>
                <Link
                  href="https://twitter.com/AIronicReview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["link-text"]}
                >
                  @AIronicReview
                </Link>
              </span>{" "}
              just might review it 👀
            </p>
            {!isLoading ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  className={styles["input-form"]}
                  type="text"
                  placeholder="https://www.amazon.com/Gizmo-5000-Black"
                  name="link"
                  id="link"
                  required
                  pattern="^https?:\/\/(www\.)?amazon\.com\/.*$"
                  title="Please enter a valid Amazon product link starting with 'https://www.amazon.com/'"
                />
                <button type="submit" className={styles["button-submit"]}>
                  Submit
                </button>
              </form>
            ) : (
              <FadeLoader color="rgb(var(--foreground-rgb))" />
            )}
          </div>
        ) : (
          <div className={styles.content}>
            {" "}
            <p className={styles["text-center"]}>
              Your Amzazon product link was successfully submited! 🎉 Follow{" "}
              <span>
                <Link
                  href="https://twitter.com/AIronicReview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["link-text"]}
                >
                  @AIronicReview
                </Link>
              </span>{" "}
              and see if your product gets reviewed ❤️
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className={styles["button-back"]}
            >
              Submit More
            </button>
          </div>
        )}

        <footer className={styles.footer}>
          <div className={styles["social-icons"]}>
            <Link
              href="https://twitter.com/AIronicReview"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="twitter.svg"
                alt="Twitter"
                width={172 / 5}
                height={139 / 5}
              />
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
