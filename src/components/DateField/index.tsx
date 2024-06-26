import { FC, HTMLAttributes } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FormControl } from '../ui/form';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { localDate } from '@/lib/helpers';
import { Calendar } from '../ui/calendar';

interface DateFieldProps extends HTMLAttributes<HTMLDivElement> {
    field: Record<string, any>;
    disabled: (date: Date) => boolean;
}

export const DateField: FC<DateFieldProps> = ({ field, disabled, ...props }) => {
    return (
        <Popover {...props}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        startContent={<CalendarIcon size={18} />}
                        variant="outline"
                        className="justify-start px-3 text-left text-muted-foreground"
                        size="lg"
                    >
                        {field.value ? localDate(field.value) : 'Pick a date'}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => disabled(date)} initialFocus />
            </PopoverContent>
        </Popover>
    );
};
