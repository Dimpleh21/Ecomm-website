/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import SelectForm from "./SelectForm";
import { useEffect, useState } from "react";
import { getCategories } from "@/utils/categories";
import { addUpdatePost } from "@/utils/posts";
import { toast } from "./ui/use-toast";

const CreateUpdateProd = ({ children, product }) => {
  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      categoryId: product?.categoryId || "",
    },
  });

  const [getCat, setCat] = useState([]);
  const [images, setImages] = useState(product?.images || []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCat(res.result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (formData) => {
    const categoryId = formData.categoryId || product?.categoryId;

    try {
      const res = await addUpdatePost(
        formData,
        images,
        categoryId,
        product?._id
      );
      if (res.result) {
        toast({
          title: "Product successfully created",
        });
      } else {
        toast({
          title: "Product not created",
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "An error occurred while saving the product",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormInput
                id="name"
                label="Name"
                placeholder="Full name"
                type="text"
                {...form.register("name")}
                className="h-10"
              />
              <FormInput
                id="description"
                label="Description"
                placeholder="Add Description"
                type="text"
                {...form.register("description")}
                className="h-10"
              />
              <FormInput
                id="price"
                label="Price"
                placeholder="Enter price"
                type="number"
                {...form.register("price")}
                className="h-10"
              />
              <SelectForm
                id="categoryId"
                label="Select Category"
                placeholder="Select Category"
                list={getCat}
                control={form.control}
              />
              {/* Image Upload and Display Section */}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateProd;
