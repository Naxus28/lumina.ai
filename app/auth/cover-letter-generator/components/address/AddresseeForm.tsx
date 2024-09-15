import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building, MapPin, Send } from 'lucide-react';
import { AddressFormBase, AddressFormBaseProps } from './AddressFormBase';
import { InputGroup } from './InputGroup';

export function AddresseeForm({ onDataChange }: AddressFormBaseProps) {
  const { formData, handleInputChange } = AddressFormBase({ onDataChange });

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <Send className="w-5 h-5 mr-2 text-[#006D77]" />
          Addressee Information
        </h3>
        <div className="space-y-4">
          <InputGroup
            label="Full Name"
            name="name"
            placeholder="e.g. C. William Bechman"
            icon={<User className="w-5 h-5 text-gray-400" />}
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Title"
            name="title"
            placeholder="e.g. Human Resources Department"
            icon={<User className="w-5 h-5 text-gray-400" />}
            value={formData.title}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Institution"
            name="institution"
            placeholder="e.g. College of Mount Saint Vincent"
            icon={<Building className="w-5 h-5 text-gray-400" />}
            value={formData.institution}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Address"
            name="address"
            placeholder="e.g. 6301 Riverdale Ave. Bronx, NY 10471"
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}