
export function DocumentsTabs() {
  return (<Tabs defaultValue="document" className="w-[400px]">
    <TabsList>
      <TabsTrigger value="document">document</TabsTrigger>
      <TabsTrigger value="chat">chat</TabsTrigger>
    </TabsList>
    <TabsContent value="document">Make changes to your document here.</TabsContent>
    <TabsContent value="chat">Change your chat here.</TabsContent>
  </Tabs>;)
}   

