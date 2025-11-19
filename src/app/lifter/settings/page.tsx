"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    routingNumber: ""
  })

  const handleSave = () => {
    // Mock save
    alert("Bank details saved!")
  }

  const handleWithdraw = () => {
    // Mock withdraw
    alert("Withdrawal request sent! You will receive funds in 2-3 business days.")
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="bank">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="withdraw">Withdrawal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input 
                  value={bankDetails.accountName}
                  onChange={e => setBankDetails({...bankDetails, accountName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input 
                  value={bankDetails.accountNumber}
                  onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Routing Number</Label>
                <Input 
                  value={bankDetails.routingNumber}
                  onChange={e => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                />
              </div>
              <Button onClick={handleSave} className="w-full">Save Details</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-3xl font-bold">$0.00</p>
              </div>
              <Button onClick={handleWithdraw} className="w-full">Withdraw Funds</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
