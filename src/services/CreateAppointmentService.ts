import {startOfHour} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/Appointments.repository';

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor( appointmentsRepository: AppointmentsRepository ){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date); 
  
    const findRepeateDate = this.appointmentsRepository.findByDate(appointmentDate);

    if(findRepeateDate){
      throw Error('ERROR - duplicate appointment')
      
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment;
  }
}

export default CreateAppointmentService;