"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Secure payment for your request.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$500.00</span>
            </div>
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>Platform Fee (20%)</span>
              <span>$100.00</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>$600.00</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="0000 0000 0000 0000" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label>CVC</Label>
              <Input placeholder="123" />
            </div>
          </div>

          <Button className="w-full size-lg mt-4">Pay Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}
