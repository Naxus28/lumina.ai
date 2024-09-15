import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building, MapPin, Send } from 'lucide-react';
import { AddressFormBase, AddressFormBaseProps } from './AddressFormBase';
import { InputGroup } from './InputGroup';

export function SenderForm({ onDataChange }: AddressFormBaseProps) {
  const { formData, handleInputChange } = AddressFormBase({ onDataChange });

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
          <Send className="w-5 h-5 mr-2 text-[#006D77]" />
          Sender Information
        </h3>
        <div className="space-y-4">
          <InputGroup
            label="Full Name"
            name="name"
            placeholder="e.g. Gabriel Ferraz"
            icon={<User className="w-5 h-5 text-gray-400" />}
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Title"
            name="title"
            placeholder="e.g. PhD Candidate in Historical Musicology"
            icon={<User className="w-5 h-5 text-gray-400" />}
            value={formData.title}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Institution"
            name="institution"
            placeholder="e.g. University of Florida School of Music"
            icon={<Building className="w-5 h-5 text-gray-400" />}
            value={formData.institution}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Address"
            name="address"
            placeholder="e.g. P.O. Box 117900 - Gainesville, FL 32611-7900"
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}