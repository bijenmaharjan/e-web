import React, { Children } from "react";
import { Label } from "../UI/label";
import { Input } from "../UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/select";

import { Textarea } from "../UI/textarea";
import { toast } from "../../hooks/use-toast";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  required,
  isBtnDisabled,
}) => {
  console.log(isBtnDisabled, "btn");
  
  const renderInputsByComponentType = (getControlItems) => {
    let value = formData[getControlItems.name || ""];

    console.log(value);
    let element;

    switch (getControlItems.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            required={required}
            value={value}
            onChange={(event) => {
              console.log(event.target.value); // Log the value being set
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              });
            }}
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItems.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItems.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {getControlItems.options && getControlItems.options.length > 0
                ? getControlItems.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );

      default:
        element = (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col  gap-3">
          {formControls.map((controlitem, index) => {
            return (
              <div key={index} className="grid w-full gap-1.5">
                <Label className="mb-1">{controlitem.label}</Label>
                {renderInputsByComponentType(controlitem)}
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className={`${
            isBtnDisabled ? "bg-slate-300" : "bg-blue-500"
          } mt-2 w-full bg-blue-500 text-white rounded-md p-1 ${
            isBtnDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isBtnDisabled}
        >
          {buttonText || "Submit"}
        </button>
      </form>
    </>
  );
};

export default Form;
