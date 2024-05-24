import { Button } from "@ctrl-chat/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ctrl-chat/ui/components/ui/card";
import { Input } from "@ctrl-chat/ui/components/ui/input";
import { Label } from "@ctrl-chat/ui/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@ctrl-chat/ui/components/ui/input-otp";
export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset your Password</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center">
            <Label htmlFor="otp">OTP</Label>
          </div>
          <InputOTP maxLength={6} id="otp">
            <div className="flex justify-center items-center w-full">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </div>
          </InputOTP>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password"> New Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="c-password">Confirm Password</Label>
            </div>
            <Input id="c-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
