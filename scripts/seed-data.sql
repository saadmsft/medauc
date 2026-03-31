-- Run this in Supabase SQL Editor to seed categories and products
-- This bypasses RLS policies

-- Insert categories
INSERT INTO categories (id, name, slug, icon_name, description) VALUES
(1, 'Oncology & Radiotherapy', 'oncology-radiotherapy', 'Radiation', 'Cancer treatment and radiation therapy equipment'),
(2, 'Bones Joints & Muscles', 'bones-joints-muscles', 'Bone', 'Orthopedic and musculoskeletal equipment'),
(3, 'Laboratory Blood & Mortuary', 'laboratory-blood-mortuary', 'FlaskConical', 'Lab testing, blood bank, and mortuary equipment'),
(4, 'Dental & Oral Care', 'dental-oral-care', 'Stethoscope', 'Dental chairs, instruments, and oral care equipment'),
(5, 'Skin Beauty & Fitness', 'skin-beauty-fitness', 'Sparkles', 'Dermatology, cosmetic, and fitness equipment'),
(6, 'ENT & Ophthalmology', 'ent-ophthalmology', 'Eye', 'Ear, nose, throat and eye care equipment'),
(7, 'Medical & Pharma Machinery', 'medical-pharma-machinery', 'Factory', 'Pharmaceutical manufacturing machinery'),
(8, 'Surgical Tools & Equipment', 'surgical-tools-equipment', 'Scissors', 'Surgical instruments and operation theater equipment'),
(9, 'ICU CCU Emergency & Trauma', 'icu-ccu-emergency-trauma', 'HeartPulse', 'Intensive care and emergency medical equipment'),
(10, 'Hospital Furniture', 'hospital-furniture', 'BedDouble', 'Hospital beds, trolleys, and furniture'),
(11, 'Imaging & Radiology', 'imaging-radiology', 'ScanLine', 'X-Ray, CT, MRI, and ultrasound equipment'),
(12, 'Gastroenterology & Pulmonology', 'gastroenterology-pulmonology', 'Wind', 'GI and respiratory diagnostic equipment')
ON CONFLICT (slug) DO NOTHING;

-- Insert products
INSERT INTO products (id, name, price, brand, status, stock, moq, category_slug, image_url, description, specs) VALUES
-- New Listings
(1, 'GE Ultrasound Machine X200', 850000, 'GE', 'New', 2, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=Ultrasound+X200', 'GE Ultrasound Machine X200 with advanced imaging capabilities. Features high-resolution display, multiple probe compatibility, and portable design for clinic and hospital use.', '{"Display": "15 inch LED", "Probes": "Convex, Linear, Micro-Convex", "Weight": "8.5 kg", "Power": "100-240V AC", "Warranty": "1 Year"}'),
(2, 'Digital X-Ray Machine Portable', 1200000, 'Philips', 'New', 1, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=X-Ray+Portable', 'Portable Digital X-Ray Machine with flat panel detector. High image quality, low radiation dose, and wireless image transfer capability.', '{"Detector": "14x17 inch Flat Panel", "Resolution": "3.5 lp/mm", "Generator": "32kW High Frequency", "Weight": "120 kg", "Warranty": "2 Years"}'),
(3, 'Patient Monitor 5 Parameter', 120000, 'Mindray', 'New', 5, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=Patient+Monitor', 'Multi-parameter patient monitor with ECG, SpO2, NIBP, Temperature, and Respiration monitoring. Compact design suitable for bedside and transport use.', '{"Parameters": "ECG, SpO2, NIBP, Temp, Resp", "Display": "12.1 inch TFT", "Battery": "4 hours backup", "Alarms": "Visual and Audible", "Warranty": "1 Year"}'),
(4, 'Color Doppler Ultrasound Machine', 650000, 'Samsung', 'Used', 1, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=Color+Doppler', 'Samsung Color Doppler Ultrasound Machine with 4D imaging capability. Excellent for cardiac, OB/GYN, and vascular applications.', '{"Display": "19 inch LED", "Modes": "B, M, Color, PW, CW", "Probes": "4 Active Ports", "Storage": "500GB HDD", "Warranty": "6 Months"}'),

-- Medical Consumables
(5, 'ECG Papers Roll Pack of 10', 3500, 'Generic', 'New', 100, 5, 'surgical-tools-equipment', 'https://placehold.co/300x200/eee/999?text=ECG+Papers', 'High quality thermal ECG recording paper rolls. Compatible with most ECG machines. Pack of 10 rolls.', '{"Size": "50mm x 30m", "Type": "Thermal", "Compatibility": "Universal", "Pack": "10 Rolls", "Shelf Life": "2 Years"}'),
(6, 'Ultrasound Gel 5L Bottle', 2000, 'Generic', 'New', 50, 2, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=Ultrasound+Gel', 'Medical grade ultrasound transmission gel. Non-staining, hypoallergenic, and water soluble. 5 liter economy bottle.', '{"Volume": "5 Liters", "Type": "Water Based", "Color": "Clear Blue", "pH": "Neutral", "Shelf Life": "3 Years"}'),
(7, 'X-Ray Films Fuji 14x17', 25000, 'Fuji', 'New', 20, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=X-Ray+Films', 'Fuji medical X-Ray films 14x17 inch size. High contrast, fine grain structure for excellent diagnostic quality. Box of 100 sheets.', '{"Size": "14 x 17 inches", "Sheets": "100 per box", "Type": "Blue Base", "Speed": "Regular", "Storage": "Cool & Dry"}'),
(8, 'CT Scan Contrast Injection Pack', 4800, 'GE', 'New', 30, 5, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=CT+Contrast', 'CT Scan contrast media injection pack. Iodine-based contrast agent for enhanced CT imaging. Single use sterile pack.', '{"Volume": "100ml", "Concentration": "350mg I/ml", "Type": "Non-ionic", "Sterility": "Single Use", "Storage": "Room Temperature"}'),

-- Diagnostic Equipment
(9, 'CT Scan Machine 16 Slice Toshiba', 8500000, 'Toshiba', 'Used', 1, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=CT+Scan+16', 'Toshiba Aquilion 16 Slice CT Scanner. Fully refurbished with new X-ray tube. Ideal for hospitals and diagnostic centers.', '{"Slices": "16", "Rotation Speed": "0.5s", "Gantry Aperture": "72cm", "kV Range": "80-135 kV", "Warranty": "1 Year"}'),
(10, 'MRI Machine 1.5 Tesla Siemens', 25000000, 'Siemens', 'Used', 1, 1, 'imaging-radiology', 'https://placehold.co/300x200/eee/999?text=MRI+1.5T', 'Siemens Magnetom Essenza 1.5T MRI Machine. Complete system with gradient coils, RF coils, and patient table. Fully operational.', '{"Field Strength": "1.5 Tesla", "Bore Size": "60cm", "Gradient": "33 mT/m", "Coils": "Head, Spine, Body, Knee", "Warranty": "1 Year"}'),
(11, 'Endoscopy System Complete Set', 950000, 'Olympus', 'New', 2, 1, 'gastroenterology-pulmonology', 'https://placehold.co/300x200/eee/999?text=Endoscopy+Set', 'Complete Olympus Endoscopy System including processor, light source, monitor, and gastroscope. Ready for GI diagnostics.', '{"Processor": "CV-170", "Light Source": "CLV-170", "Monitor": "19 inch HD", "Scope": "GIF-H170", "Warranty": "1 Year"}'),
(12, 'Digital ECG Machine 6 Channel', 400000, 'GE', 'New', 3, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=ECG+6CH', 'GE MAC 600 6-Channel Digital ECG Machine with interpretation. Auto measurement and analysis with thermal printer.', '{"Channels": "6", "Display": "5.7 inch LCD", "Leads": "12 Lead Standard", "Printer": "Thermal", "Battery": "3 hours"}'),

-- Lab Equipment
(13, 'Hematology Analyzer 3 Part', 180000, 'Mindray', 'New', 4, 1, 'laboratory-blood-mortuary', 'https://placehold.co/300x200/eee/999?text=Hematology+3P', 'Mindray BC-20 3-Part Hematology Analyzer. Provides CBC with 3-part differential. High throughput of 60 samples per hour.', '{"Parameters": "20", "Throughput": "60 samples/hr", "Sample Volume": "13 uL", "Display": "8 inch LCD", "Warranty": "1 Year"}'),
(14, 'Biochemistry Analyzer Fully Auto', 350000, 'Roche', 'New', 2, 1, 'laboratory-blood-mortuary', 'https://placehold.co/300x200/eee/999?text=Biochemistry+Auto', 'Fully automated random access biochemistry analyzer. 200 tests per hour with ISE module for electrolytes.', '{"Throughput": "200 tests/hr", "Reagent Positions": "60", "Sample Positions": "90", "Methods": "Photometry, ISE", "Warranty": "1 Year"}'),
(15, 'Urine Analyzer Machine', 90000, 'Roche', 'New', 6, 1, 'laboratory-blood-mortuary', 'https://placehold.co/300x200/eee/999?text=Urine+Analyzer', 'Automated urine analyzer with strip reader. Tests for glucose, protein, pH, blood, and 7 other parameters.', '{"Parameters": "11", "Throughput": "120 strips/hr", "Method": "Reflectance Photometry", "Printer": "Built-in Thermal", "Warranty": "1 Year"}'),
(16, 'Electrolyte Analyzer Machine', 220000, 'Roche', 'Used', 2, 1, 'laboratory-blood-mortuary', 'https://placehold.co/300x200/eee/999?text=Electrolyte+Analyzer', 'ISE Electrolyte Analyzer for Na, K, Cl, Ca, Li measurement. Fast results in 60 seconds with minimal sample volume.', '{"Parameters": "Na, K, Cl, Ca, Li", "Method": "Ion Selective Electrode", "Result Time": "60 seconds", "Sample Volume": "95 uL", "Warranty": "6 Months"}'),

-- Monitoring Equipment
(17, 'Digital Blood Pressure Monitor', 4500, 'Omron', 'New', 50, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=BP+Monitor', 'Omron Digital Blood Pressure Monitor with large display. Clinically validated with irregular heartbeat detection.', '{"Method": "Oscillometric", "Range": "0-299 mmHg", "Memory": "60 Readings", "Cuff Size": "22-42 cm", "Power": "4x AA Batteries"}'),
(18, 'Fetal Doppler Handheld', 7000, 'Generic', 'New', 20, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=Fetal+Doppler', 'Handheld Fetal Doppler for monitoring fetal heart rate. LCD display with speaker. Easy to use for clinics and home.', '{"Frequency": "2 MHz", "FHR Range": "50-240 BPM", "Display": "LCD", "Power": "2x AA Battery", "Weight": "180g"}'),
(19, 'Multipara Cardiac Monitor', 150000, 'Philips', 'New', 3, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=Cardiac+Monitor', 'Multi-parameter cardiac monitor with 12-lead ECG, SpO2, NIBP, IBP, EtCO2, and temperature monitoring. For ICU and CCU use.', '{"Parameters": "ECG, SpO2, NIBP, IBP, EtCO2, Temp", "Display": "15 inch TFT", "Battery": "6 hours", "Network": "WiFi, LAN", "Warranty": "2 Years"}'),
(20, 'Pulse Oximeter Fingertip', 12000, 'Mindray', 'New', 100, 1, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=Pulse+Oximeter', 'Professional fingertip pulse oximeter with OLED display. Measures SpO2 and pulse rate with perfusion index.', '{"SpO2 Range": "0-100%", "PR Range": "25-250 BPM", "Display": "OLED", "Battery": "2x AAA", "Weight": "50g"}'),

-- Surgical Equipment
(21, 'LED Operation Theater Light', 220000, 'Generic', 'New', 5, 1, 'surgical-tools-equipment', 'https://placehold.co/300x200/eee/999?text=OT+Light+LED', 'Double dome LED operation theater light with ceiling mount. Shadow-free illumination with adjustable color temperature.', '{"Illuminance": "160,000 Lux", "Color Temp": "3500-5000K", "CRI": ">95", "Dome": "Double", "Warranty": "2 Years"}'),
(22, 'Electrosurgical Diathermy Unit', 95000, 'Generic', 'New', 8, 1, 'surgical-tools-equipment', 'https://placehold.co/300x200/eee/999?text=Diathermy+Unit', 'Digital electrosurgical unit with mono and bipolar modes. Suitable for general surgery, ENT, and gynecology procedures.', '{"Power": "400W Mono, 80W Bipolar", "Modes": "Cut, Coag, Blend, Bipolar", "Frequency": "500 kHz", "Display": "Digital LED", "Warranty": "1 Year"}'),
(23, 'Laparoscopy Complete Set', 1500000, 'Karl Storz', 'New', 1, 1, 'surgical-tools-equipment', 'https://placehold.co/300x200/eee/999?text=Laparoscopy+Set', 'Complete laparoscopy set including camera, light source, insufflator, monitor, and instrument set. Ready for minimally invasive surgery.', '{"Camera": "Full HD 1080p", "Light Source": "LED", "Insufflator": "30L/min", "Monitor": "26 inch Full HD", "Warranty": "1 Year"}'),
(24, 'Surgical Laser Machine CO2', 300000, 'Generic', 'Used', 1, 1, 'surgical-tools-equipment', 'https://placehold.co/300x200/eee/999?text=CO2+Laser', 'CO2 Surgical Laser Machine for cutting and ablation. Used in dermatology, ENT, and gynecology procedures.', '{"Power": "30W", "Wavelength": "10.6 um", "Mode": "CW, Pulse, Super Pulse", "Spot Size": "0.2-2mm", "Warranty": "6 Months"}'),

-- Homecare Products
(25, 'Electric Wheelchair Foldable', 180000, 'Generic', 'New', 3, 1, 'hospital-furniture', 'https://placehold.co/300x200/eee/999?text=Wheelchair+Electric', 'Foldable electric wheelchair with lithium battery. Lightweight aluminum frame, joystick control, and 20km range.', '{"Weight Capacity": "120 kg", "Battery": "24V Lithium", "Range": "20 km", "Weight": "23 kg", "Warranty": "1 Year"}'),
(26, 'Infrared Thermometer Gun', 2500, 'Generic', 'New', 200, 5, 'icu-ccu-emergency-trauma', 'https://placehold.co/300x200/eee/999?text=IR+Thermometer', 'Non-contact infrared thermometer gun. Instant reading with fever alarm. Suitable for forehead and object temperature.', '{"Range": "32-42.9 C", "Accuracy": "+/- 0.2 C", "Distance": "1-5 cm", "Memory": "32 Readings", "Power": "2x AAA Battery"}'),
(27, 'Nebulizer Machine Portable', 5000, 'Omron', 'New', 30, 1, 'gastroenterology-pulmonology', 'https://placehold.co/300x200/eee/999?text=Nebulizer', 'Portable compressor nebulizer for home use. Quiet operation with adjustable nebulization rate. Complete with mask and tubing.', '{"Type": "Compressor", "Nebulization Rate": "0.3 ml/min", "Capacity": "8 ml", "Noise": "<55 dB", "Warranty": "1 Year"}'),
(28, 'TENS Pain Relief Machine', 8500, 'Omron', 'New', 25, 1, 'bones-joints-muscles', 'https://placehold.co/300x200/eee/999?text=TENS+Machine', 'TENS (Transcutaneous Electrical Nerve Stimulation) machine for pain relief. Multiple programs for different body areas.', '{"Channels": "2", "Programs": "15 Pre-set", "Intensity": "0-80 mA", "Timer": "10-60 min", "Power": "Rechargeable"}'),

-- Additional Products - Oncology
(29, 'Linear Accelerator Varian', 45000000, 'Varian', 'Used', 1, 1, 'oncology-radiotherapy', 'https://placehold.co/300x200/eee/999?text=Linear+Accelerator', 'Varian Clinac Linear Accelerator for radiation therapy. Fully refurbished with new multileaf collimator.', '{"Energy": "6-18 MV Photon", "MLC": "120 Leaves", "Dose Rate": "Up to 600 MU/min", "Warranty": "1 Year"}'),
(30, 'Cobalt-60 Therapy Unit', 12000000, 'GE', 'Used', 1, 1, 'oncology-radiotherapy', 'https://placehold.co/300x200/eee/999?text=Cobalt+60+Unit', 'Cobalt-60 teletherapy machine for cancer treatment. Source replaced recently with full shielding.', '{"Source": "Co-60", "Activity": "5000 Ci", "Field Size": "5x5 to 35x35 cm", "Warranty": "6 Months"}'),
(31, 'Radiation Treatment Planning System', 8000000, 'Philips', 'New', 2, 1, 'oncology-radiotherapy', 'https://placehold.co/300x200/eee/999?text=Treatment+Planning', 'Advanced radiation treatment planning system with 3D conformal and IMRT capabilities.', '{"Type": "3D CRT, IMRT, VMAT", "Platform": "Windows Workstation", "License": "Perpetual", "Warranty": "2 Years"}'),
(32, 'Brachytherapy After-Loader', 15000000, 'Varian', 'New', 1, 1, 'oncology-radiotherapy', 'https://placehold.co/300x200/eee/999?text=Brachytherapy', 'HDR brachytherapy after-loading system for internal radiation therapy. Complete with applicators.', '{"Source": "Ir-192", "Channels": "18", "Step Size": "2.5mm", "Warranty": "1 Year"}'),

-- Dental
(33, 'Dental Chair Unit Complete', 450000, 'Generic', 'New', 5, 1, 'dental-oral-care', 'https://placehold.co/300x200/eee/999?text=Dental+Chair', 'Complete dental chair unit with LED operating light, handpiece connections, and suction system.', '{"Light": "LED Sensor", "Handpieces": "3 Connections", "Suction": "High & Low", "Warranty": "2 Years"}'),
(34, 'Dental X-Ray Unit Portable', 180000, 'Generic', 'New', 8, 1, 'dental-oral-care', 'https://placehold.co/300x200/eee/999?text=Dental+X-Ray', 'Portable dental X-ray machine with digital sensor. Handheld design for easy intraoral imaging.', '{"Voltage": "60 kV", "Current": "2 mA", "Sensor": "Digital CMOS", "Weight": "1.8 kg"}'),
(35, 'Dental Autoclave 23L', 95000, 'Generic', 'New', 10, 1, 'dental-oral-care', 'https://placehold.co/300x200/eee/999?text=Dental+Autoclave', 'Class B dental autoclave sterilizer 23 liters. Pre-vacuum cycle for wrapped and unwrapped instruments.', '{"Capacity": "23 Liters", "Class": "B", "Temp": "134C", "Cycle": "18 min", "Warranty": "1 Year"}'),
(36, 'Ultrasonic Dental Scaler', 35000, 'Generic', 'New', 15, 1, 'dental-oral-care', 'https://placehold.co/300x200/eee/999?text=Dental+Scaler', 'Piezoelectric ultrasonic dental scaler for professional cleaning. Multiple tips included.', '{"Frequency": "28-32 kHz", "Tips": "5 Included", "Power": "Adjustable", "Water": "Auto Irrigation"}'),

-- Skin Beauty & Fitness
(37, 'IPL Laser Hair Removal Machine', 650000, 'Generic', 'New', 3, 1, 'skin-beauty-fitness', 'https://placehold.co/300x200/eee/999?text=IPL+Laser', 'Professional IPL laser machine for permanent hair removal and skin rejuvenation. Multi-wavelength system.', '{"Wavelength": "480-1200nm", "Spot Size": "15x50mm", "Energy": "50 J/cm2", "Cooling": "Sapphire Contact"}'),
(38, 'Dermatoscope Digital', 85000, 'Generic', 'New', 10, 1, 'skin-beauty-fitness', 'https://placehold.co/300x200/eee/999?text=Dermatoscope', 'Digital dermatoscope with polarized and non-polarized modes. High magnification for skin lesion analysis.', '{"Magnification": "10x-200x", "Camera": "5 MP", "Light": "LED Polarized", "Connection": "USB/WiFi"}'),
(39, 'Hydrafacial Machine Professional', 280000, 'Generic', 'New', 4, 1, 'skin-beauty-fitness', 'https://placehold.co/300x200/eee/999?text=Hydrafacial', 'Professional hydrafacial machine with microdermabrasion, deep cleansing, and serum infusion functions.', '{"Functions": "6-in-1", "Tips": "Multiple Sizes", "Display": "10 inch Touch", "Warranty": "1 Year"}'),
(40, 'Body Composition Analyzer', 320000, 'Generic', 'New', 3, 1, 'skin-beauty-fitness', 'https://placehold.co/300x200/eee/999?text=Body+Analyzer', 'Professional body composition analyzer using bioelectrical impedance. Measures fat, muscle, water, and BMI.', '{"Method": "BIA Multi-Frequency", "Parameters": "20+", "Printer": "Built-in Thermal", "Print": "Auto Report"}'),

-- ENT & Ophthalmology
(41, 'Slit Lamp Biomicroscope', 350000, 'Generic', 'New', 4, 1, 'ent-ophthalmology', 'https://placehold.co/300x200/eee/999?text=Slit+Lamp', 'Ophthalmic slit lamp biomicroscope with 5 magnifications. LED illumination for comprehensive eye examination.', '{"Magnification": "6x-40x", "Slit Width": "0-14mm", "Light": "LED", "Eyepiece": "12.5x Wide Field"}'),
(42, 'Auto Refractometer Keratometer', 550000, 'Generic', 'New', 3, 1, 'ent-ophthalmology', 'https://placehold.co/300x200/eee/999?text=Refractometer', 'Automatic refractometer with keratometer for measuring refractive errors and corneal curvature.', '{"SPH Range": "-30 to +25D", "CYL Range": "0 to +/-12D", "Measurement": "Auto Tracking", "Printer": "Built-in"}'),
(43, 'ENT Treatment Unit', 420000, 'Generic', 'New', 3, 1, 'ent-ophthalmology', 'https://placehold.co/300x200/eee/999?text=ENT+Unit', 'Complete ENT treatment unit with patient chair, suction, spray, and diagnostic instruments.', '{"Components": "Chair, Suction, Spray", "Instruments": "Otoscope, Laryngoscope", "Light": "LED Headlight", "Warranty": "1 Year"}'),
(44, 'Audiometer Diagnostic', 280000, 'Generic', 'New', 5, 1, 'ent-ophthalmology', 'https://placehold.co/300x200/eee/999?text=Audiometer', 'Two-channel diagnostic audiometer for comprehensive hearing assessment. Air, bone, and speech testing.', '{"Channels": "2", "Frequency": "125-8000 Hz", "Intensity Range": "-10 to 120 dB HL", "Tests": "Air, Bone, Speech"}'),

-- Hospital Furniture
(45, 'Hospital Bed Electric 3 Function', 85000, 'Generic', 'New', 10, 1, 'hospital-furniture', 'https://placehold.co/300x200/eee/999?text=Hospital+Bed', 'Electric hospital bed with 3 motor functions. Height, back, and leg adjustment with side rails.', '{"Functions": "3 (Height, Back, Leg)", "Mattress": "4 Section", "Rails": "Collapsible", "Weight": "180 kg", "Warranty": "2 Years"}'),
(46, 'Patient Stretcher Trolley', 45000, 'Generic', 'New', 15, 1, 'hospital-furniture', 'https://placehold.co/300x200/eee/999?text=Stretcher', 'Hydraulic patient stretcher trolley with adjustable height. X-ray translucent top with side rails.', '{"Height": "Hydraulic Adjustable", "Top": "X-Ray Translucent", "Rails": "Fold Down", "Wheels": "6 inch Castors"}'),
(47, 'ICU Bed Full Electric', 180000, 'Generic', 'New', 5, 1, 'hospital-furniture', 'https://placehold.co/300x200/eee/999?text=ICU+Bed', 'Full electric ICU bed with CPR function, Trendelenburg, and weighing system. For intensive care units.', '{"Functions": "5 Motor", "CPR": "Quick Release", "Trendelenburg": "+/-15 deg", "Scale": "Built-in", "Warranty": "2 Years"}'),
(48, 'Medicine Trolley Stainless Steel', 28000, 'Generic', 'New', 20, 1, 'hospital-furniture', 'https://placehold.co/300x200/eee/999?text=Medicine+Trolley', 'Stainless steel medicine distribution trolley with multiple drawers and lockable top.', '{"Material": "SS 304", "Drawers": "6", "Top": "Lockable", "Wheels": "4 inch Silent", "Size": "60x40x90 cm"}')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  brand = EXCLUDED.brand,
  status = EXCLUDED.status,
  stock = EXCLUDED.stock,
  moq = EXCLUDED.moq,
  category_slug = EXCLUDED.category_slug,
  image_url = EXCLUDED.image_url,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs;

-- Reset sequence to avoid ID conflicts
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
