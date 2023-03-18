/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Person } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PersonCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    image: "",
    boxColour: "",
    physicalSignal: "",
    socialIdentity: "",
    emotion: "",
    socialRelation: "",
    environment: "",
    caption: "",
  };
  const [image, setImage] = React.useState(initialValues.image);
  const [boxColour, setBoxColour] = React.useState(initialValues.boxColour);
  const [physicalSignal, setPhysicalSignal] = React.useState(
    initialValues.physicalSignal
  );
  const [socialIdentity, setSocialIdentity] = React.useState(
    initialValues.socialIdentity
  );
  const [emotion, setEmotion] = React.useState(initialValues.emotion);
  const [socialRelation, setSocialRelation] = React.useState(
    initialValues.socialRelation
  );
  const [environment, setEnvironment] = React.useState(
    initialValues.environment
  );
  const [caption, setCaption] = React.useState(initialValues.caption);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setImage(initialValues.image);
    setBoxColour(initialValues.boxColour);
    setPhysicalSignal(initialValues.physicalSignal);
    setSocialIdentity(initialValues.socialIdentity);
    setEmotion(initialValues.emotion);
    setSocialRelation(initialValues.socialRelation);
    setEnvironment(initialValues.environment);
    setCaption(initialValues.caption);
    setErrors({});
  };
  const validations = {
    image: [],
    boxColour: [],
    physicalSignal: [{ type: "JSON" }],
    socialIdentity: [{ type: "JSON" }],
    emotion: [],
    socialRelation: [{ type: "JSON" }],
    environment: [],
    caption: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          image,
          boxColour,
          physicalSignal,
          socialIdentity,
          emotion,
          socialRelation,
          environment,
          caption,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Person(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PersonCreateForm")}
      {...rest}
    >
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image: value,
              boxColour,
              physicalSignal,
              socialIdentity,
              emotion,
              socialRelation,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Box colour"
        isRequired={false}
        isReadOnly={false}
        value={boxColour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour: value,
              physicalSignal,
              socialIdentity,
              emotion,
              socialRelation,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.boxColour ?? value;
          }
          if (errors.boxColour?.hasError) {
            runValidationTasks("boxColour", value);
          }
          setBoxColour(value);
        }}
        onBlur={() => runValidationTasks("boxColour", boxColour)}
        errorMessage={errors.boxColour?.errorMessage}
        hasError={errors.boxColour?.hasError}
        {...getOverrideProps(overrides, "boxColour")}
      ></TextField>
      <TextAreaField
        label="Physical signal"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal: value,
              socialIdentity,
              emotion,
              socialRelation,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.physicalSignal ?? value;
          }
          if (errors.physicalSignal?.hasError) {
            runValidationTasks("physicalSignal", value);
          }
          setPhysicalSignal(value);
        }}
        onBlur={() => runValidationTasks("physicalSignal", physicalSignal)}
        errorMessage={errors.physicalSignal?.errorMessage}
        hasError={errors.physicalSignal?.hasError}
        {...getOverrideProps(overrides, "physicalSignal")}
      ></TextAreaField>
      <TextAreaField
        label="Social identity"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal,
              socialIdentity: value,
              emotion,
              socialRelation,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.socialIdentity ?? value;
          }
          if (errors.socialIdentity?.hasError) {
            runValidationTasks("socialIdentity", value);
          }
          setSocialIdentity(value);
        }}
        onBlur={() => runValidationTasks("socialIdentity", socialIdentity)}
        errorMessage={errors.socialIdentity?.errorMessage}
        hasError={errors.socialIdentity?.hasError}
        {...getOverrideProps(overrides, "socialIdentity")}
      ></TextAreaField>
      <TextField
        label="Emotion"
        isRequired={false}
        isReadOnly={false}
        value={emotion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal,
              socialIdentity,
              emotion: value,
              socialRelation,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.emotion ?? value;
          }
          if (errors.emotion?.hasError) {
            runValidationTasks("emotion", value);
          }
          setEmotion(value);
        }}
        onBlur={() => runValidationTasks("emotion", emotion)}
        errorMessage={errors.emotion?.errorMessage}
        hasError={errors.emotion?.hasError}
        {...getOverrideProps(overrides, "emotion")}
      ></TextField>
      <TextAreaField
        label="Social relation"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal,
              socialIdentity,
              emotion,
              socialRelation: value,
              environment,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.socialRelation ?? value;
          }
          if (errors.socialRelation?.hasError) {
            runValidationTasks("socialRelation", value);
          }
          setSocialRelation(value);
        }}
        onBlur={() => runValidationTasks("socialRelation", socialRelation)}
        errorMessage={errors.socialRelation?.errorMessage}
        hasError={errors.socialRelation?.hasError}
        {...getOverrideProps(overrides, "socialRelation")}
      ></TextAreaField>
      <TextField
        label="Environment"
        isRequired={false}
        isReadOnly={false}
        value={environment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal,
              socialIdentity,
              emotion,
              socialRelation,
              environment: value,
              caption,
            };
            const result = onChange(modelFields);
            value = result?.environment ?? value;
          }
          if (errors.environment?.hasError) {
            runValidationTasks("environment", value);
          }
          setEnvironment(value);
        }}
        onBlur={() => runValidationTasks("environment", environment)}
        errorMessage={errors.environment?.errorMessage}
        hasError={errors.environment?.hasError}
        {...getOverrideProps(overrides, "environment")}
      ></TextField>
      <TextField
        label="Caption"
        isRequired={false}
        isReadOnly={false}
        value={caption}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              boxColour,
              physicalSignal,
              socialIdentity,
              emotion,
              socialRelation,
              environment,
              caption: value,
            };
            const result = onChange(modelFields);
            value = result?.caption ?? value;
          }
          if (errors.caption?.hasError) {
            runValidationTasks("caption", value);
          }
          setCaption(value);
        }}
        onBlur={() => runValidationTasks("caption", caption)}
        errorMessage={errors.caption?.errorMessage}
        hasError={errors.caption?.hasError}
        {...getOverrideProps(overrides, "caption")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
