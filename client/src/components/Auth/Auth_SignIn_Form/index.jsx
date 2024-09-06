import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";

// IMPORT FROM CONSTANTS - SIGNUP INPUTS
import { signIn_Inputs } from "@/constants";

// REACT ICON
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

// REDUX
import { useDispatch } from "react-redux";
import { user_SignIn_Action } from "@/store/auth_Slice";

// TOASTER
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters long." })
    .max(50, { message: "Email must be less than 50 characters." })
    .email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password must be less than 50 characters." }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter.",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter.",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number." })
  // .regex(/[@$!%*?&]/, {
  //   message: "Password must contain at least one special character.",
  // }),
});

export default function SignInForm() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    dispatch(user_SignIn_Action(values)).then((data) => {
      if (data?.payload?.success) {
        form.reset();
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          description: "Please Try Again.",
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="px-10 space-y-10">
      <h1 className="text-center text-3xl lg:text-5xl font-heading font-semibold uppercase">
        SIGN IN your account
      </h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {signIn_Inputs?.map((eachInput, index) => (
              <FormField
                key={index}
                control={form.control}
                name={eachInput?.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{eachInput?.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={eachInput?.placeholder}
                        {...field}
                        type={eachInput?.type}
                        className="w-full max-lg:border  max-lg:bg-white/80 max-lg:py-5"
                      />
                    </FormControl>
                    <FormDescription className="hidden">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div>
              <Button
                type="submit"
                className="uppercase flex items-center gap-2 px-6 py-5 rounded-full group"
              >
                <span>Sign In</span>
                <FaArrowRightLong
                  size={16}
                  className="group-hover:translate-x-2 transition duration-300 ease-linear"
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex items-center gap-2 capitalize">
        <p className="">
          Don<span>&apos;t</span> have an Account ?
        </p>
        <Link
          to={"/auth/signUp"}
          className="font-semibold hover:underline underline-offset-2"
        >
          SignUp
        </Link>
      </div>
    </div>
  );
}
