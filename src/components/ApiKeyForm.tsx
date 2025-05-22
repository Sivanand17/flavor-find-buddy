
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getApiKey, saveApiKey, removeApiKey } from '../services/apiKeyService';
import { useToast } from "@/hooks/use-toast";

interface ApiKeyFormProps {
  onApiKeySet: () => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const savedApiKey = getApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setIsEditing(true);
    }
  }, []);
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    saveApiKey(apiKey.trim());
    setIsEditing(false);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
    onApiKeySet();
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleRemove = () => {
    removeApiKey();
    setApiKey('');
    setIsEditing(true);
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed from local storage",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Spoonacular API Key</CardTitle>
        <CardDescription>
          Enter your Spoonacular API key to search for recipes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            <Alert variant="outline" className="bg-muted/50">
              <AlertDescription>
                Don't have an API key? You can get a free one by signing up at{" "}
                <a 
                  href="https://spoonacular.com/food-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  spoonacular.com/food-api
                </a>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="py-2">
            <div className="font-medium">API Key:</div>
            <div className="font-mono bg-secondary px-3 py-1 rounded mt-1 text-sm overflow-hidden text-ellipsis">
              {apiKey.substring(0, 8)}...{apiKey.substring(apiKey.length - 4)}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <Button onClick={handleSave} className="bg-avocado hover:bg-avocado/90">Save API Key</Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleEdit}>Edit</Button>
            <Button variant="destructive" onClick={handleRemove}>Remove</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApiKeyForm;
