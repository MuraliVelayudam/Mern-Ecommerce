import { Link, useNavigate } from "react-router-dom";
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
import { signUp_Inputs } from "@/constants";

// REACT ICON
import { FaArrowRightLong } from "react-icons/fa6";

// SHAD CN TOASTER
import { useToast } from "@/hooks/use-toast";

// REDUX THUNK ACTION
import { useDispatch } from "react-redux";
import { user_SignUp_Action } from "@/store/auth_Slice";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(50, { message: "Username must be less than 50 characters." }),
  // .regex(/^[a-zA-Z0-9_]+$/, {
  //   message: "Username can only contain letters, numbers, and underscores.",
  // }),

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

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    dispatch(user_SignUp_Action(values)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        form.reset();
        navigate("/auth/signIn");
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
        SIGN UP for a new account
      </h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {signUp_Inputs?.map((eachInput, index) => (
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
                className="uppercase flex items-center gap-2 px-6 py-4 rounded-full group"
              >
                Sign UP
                <span>
                  <FaArrowRightLong
                    size={16}
                    className="group-hover:translate-x-2 transition duration-300 ease-linear"
                  />
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex items-center gap-2 capitalize">
        <p className="">Already have an account ? </p>
        <Link
          to={"/auth/signIn"}
          className="font-semibold hover:underline underline-offset-2"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
}
