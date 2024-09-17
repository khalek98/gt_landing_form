"use client";
import React, { useEffect } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import styles from "./Main.module.scss";
import { mainContent } from "./content";
import CrossIcon from "./icon/cross.svg";
import PlusIcon from "./icon/plus.svg";
import StageCircleIcon from "@/assets/icons/circle_stager.svg";
import FormNextArrowIcon from "@/assets/icons/form_next_arrow.svg";
import { countries } from "./countries";

interface IFormInput {
  numberOfPeople: string;
  companyHeadquarters: string;
  fullName: string;
  email: string;
  companyWebsite: string;
  phoneNumber: string;
}

const stageCount: number = 3;

const Main = () => {
  const { locale } = useRouter();
  const [stage, setStage] = React.useState(0);
  const [alert, setAlert] = React.useState<"success" | "error" | false>(false);

  const { handleSubmit, control, trigger, reset } = useForm<IFormInput>({
    defaultValues: {
      numberOfPeople: "",
      companyHeadquarters: "",
      fullName: "",
      email: "",
      companyWebsite: "",
      phoneNumber: "",
    },
  });

  const nextStage = async () => {
    const valid = await trigger();
    if (valid) {
      setStage((prev) => prev + 1);
    }
  };

  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    await fetch("/mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setStage(0);
          reset();
          setAlert("success");
        } else {
          console.log(res);
          setAlert("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert("error");
      });
  };

  useEffect(() => {
    // <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
    const scriptElem = document.createElement("script");
    scriptElem.type = "text/javascript";
    scriptElem.src = "https://assets.calendly.com/assets/external/widget.js";
    scriptElem.async = true;
    document.head.append(scriptElem);
  }, []);

  return (
    <>
      <section className={styles.Main}>
        <div className={styles.BigCircle}></div>

        <div className={cn("container", styles.Container)}>
          <div className={styles.SmallCircle}></div>

          <div className={styles.Content}>
            <h1 className={styles.Title}>
              <span className={styles.Blue}>{mainContent[locale].titleSpan1}</span>{" "}
              {mainContent[locale].title}{" "}
              <span className={styles.Green}>{mainContent[locale].titleSpan2}</span>
            </h1>

            <p className={styles.Text}>
              When tech talent is on the move, many companies are left understaffed. Need a fast,
              affordable fix? Nearshore remote developers are your answer.{" "}
              <span>But should you go with freelancers or dedicated teams?</span>
            </p>

            <ul className={styles.List}>
              <li className={styles.ListItem}>
                <CrossIcon className={styles.ListIcon} />
                <p className={styles.ListText}>
                  <span>Freelancers</span> juggle multiple projects, focus on the highest bidder.
                </p>
              </li>
              <li className={styles.ListItem}>
                <PlusIcon className={styles.ListIcon} />
                <p className={styles.ListText}>
                  <span>Dedicated</span> teams work exclusively on your project. Their priority is
                  your success, ensuring long-term value.
                </p>
              </li>
            </ul>

            <p className={styles.Text}>
              If you're looking to get started quickly, this is your most efficient, cost-effective
              way to secure top-tier talent.
            </p>

            <p className={cn(styles.Text, styles.SemiBold)}>
              Book a free demo today and enjoy 10% off your first month!
            </p>
          </div>

          <div className={styles.FormWrapper}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/xalek-islam/30min?hide_landing_page_details=1&hide_gdpr_banner=1"
              style={{
                minWidth: "320px",
                height: "100%",
                width: "100%",
                borderRadius: 34,
                overflow: "hidden",
              }}
            ></div>
            {/* <h2 className={styles.FormTitle}>Build Your Dream Team with Us</h2>
            <p className={styles.FormLabel}>Let's get started with your hiring needs</p>

            <ul className={styles.StageWrapper}>
              {Array.from({ length: stageCount }).map((_, index) => (
                <li className={styles.StageItem} key={index}>
                  <StageCircleIcon
                    className={cn(styles.StageCircle, { [styles.Active]: index === stage })}
                  />
                </li>
              ))}
            </ul> */}

            {/* <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
              {stage === 0 && (
                <div className={styles.FormField}>
                  <p className={styles.FormFieldLabel}>How many people work at your company?</p>
                  <Controller
                    name="numberOfPeople"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl fullWidth>
                        <InputLabel id="label-number-of-people">Number of people</InputLabel>
                        <Select
                          {...field}
                          error={!!error}
                          sx={{
                            borderRadius: "10px",
                            background: "#fff",
                            boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07)",
                            fontFamily: "DM Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                          labelId="label-number-of-people"
                          label="Number of people"
                        >
                          <MenuItem value={""} disabled>
                            Number of people
                          </MenuItem>
                          <MenuItem value={"1-20"}>1-20</MenuItem>
                          <MenuItem value={"21-200"}>21-200</MenuItem>
                          <MenuItem value={"201-2000"}>201-2000</MenuItem>
                          <MenuItem value={"2000+"}>2000+</MenuItem>
                        </Select>
                        {error && (
                          <FormHelperText error>Please select a company size</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />

                
                </div>
              )}

              {stage === 1 && (
                <div className={styles.FormField}>
                  <p className={styles.FormFieldLabel}>Where is your company headquarters?</p>
                  <Controller
                    name="companyHeadquarters"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl fullWidth>
                        <InputLabel id="label-company-headquarters">
                          Company headquarters
                        </InputLabel>
                        <Select
                          {...field}
                          sx={{
                            borderRadius: "10px",
                            background: "#fff",
                            boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07)",
                            fontFamily: "DM Sans",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                          labelId="label-company-headquarters"
                          label="Company headquarters"
                          error={!!error}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.code} value={country.name}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && <FormHelperText error>Please select a country</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </div>
              )}

              {stage === 2 && (
                <>
                  <Controller
                    control={control}
                    name="fullName"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        label="Full Name"
                        helperText={!!error && "Please enter your full name"}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        label="Email"
                        helperText={!!error && "Please enter a email"}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="companyWebsite"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        label="Company Website"
                        helperText={!!error && "Please enter a website"}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        label="Phone Number"
                        helperText={!!error && "Please enter your phone number"}
                      />
                    )}
                  />

                  <p className={styles.PrivacyText}>
                    We respect your data. By submitting this form, you agree that we will contact
                    you in relation to our products and services, in accordance with our privacy
                    policy.
                  </p>
                </>
              )}

              <div
                className={cn(styles.FormButtons, { [styles.Column]: stage === stageCount - 1 })}
              >
                <button
                  className={cn(styles.FormButton, styles.ScheduleButton, {
                    [styles.Show]: stage === stageCount - 1,
                  })}
                  type="submit"
                >
                  Schedule a demo <FormNextArrowIcon className={styles.ArrowNext} />
                </button>

                <button
                  className={cn(styles.FormButton, styles.BackButton, { [styles.Show]: stage > 0 })}
                  onClick={prevStage}
                  type="button"
                >
                  Go Back
                </button>

                <button
                  className={cn(styles.FormButton, styles.NextButton, {
                    [styles.Show]: stage < stageCount - 1,
                  })}
                  onClick={nextStage}
                  type="button"
                >
                  Next step
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </section>

      <Snackbar open={!!alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
        <Alert
          onClose={() => setAlert(false)}
          severity={alert === "success" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert === "success"
            ? "Thank you! We'll get back to you shortly"
            : "Something went wrong. Please try again"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
