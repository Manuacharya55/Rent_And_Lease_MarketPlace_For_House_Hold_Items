import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema } from '../schema/Address.Schema';
import Map from '../components/Location/Map';

const AddressForm = ({ data, handleSubmit, isProcessing }) => {
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        resolver: zodResolver(AddressSchema),
        defaultValues: data || {}
    });

    // Watch for location changes to pass to Map potentially (if needed for initial marker)
    // But strictly, Map sets form values.

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const setLocationFromMap = (locationData) => {
        setValue("lat", locationData.lat);
        setValue("lng", locationData.lng);
        setValue("country", locationData.country);
        setValue("state", locationData.state);
        setValue("district", locationData.district);
        setValue("address", locationData.address);
    };

    return (
        <div className="address-layout">
            <div className="map-side">
                <Map setLocation={setLocationFromMap} initialLocation={data ? { lat: data.lat, lng: data.lng } : null} />
            </div>

            <div className="form-side">
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
                    {data ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleFormSubmit(handleSubmit)} className="grid-form">
                    <div className="auth-input-group span-2">
                        <label>Selected Address (Auto-filled from Map)</label>
                        <textarea
                            {...register("address")}
                            placeholder="Click on map to select address"
                            rows={3}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                        />
                        {errors.address && <span className="error-message">{errors.address.message}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label>Latitude</label>
                        <input type="number" step="any" {...register("lat", { valueAsNumber: true })} disabled />
                        {errors.lat && <span className="error-message">{errors.lat.message}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label>Longitude</label>
                        <input type="number" step="any" {...register("lng", { valueAsNumber: true })} disabled />
                        {errors.lng && <span className="error-message">{errors.lng.message}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label>Country</label>
                        <input type="text" {...register("country")} disabled />
                        {errors.country && <span className="error-message">{errors.country.message}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label>State</label>
                        <input type="text" {...register("state")} disabled />
                        {errors.state && <span className="error-message">{errors.state.message}</span>}
                    </div>

                    <div className="auth-input-group span-2">
                        <label>District</label>
                        <input type="text" {...register("district")} disabled />
                        {errors.district && <span className="error-message">{errors.district.message}</span>}
                    </div>

                    <button type="submit" disabled={isProcessing} className="span-2 full-width">
                        {isProcessing ? 'Saving Address...' : 'Save Address'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
