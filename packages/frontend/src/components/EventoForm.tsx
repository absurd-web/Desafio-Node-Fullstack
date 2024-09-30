import Grid from '@mui/material/Grid2'
import CustomBreadcrumbs from './CustomBreadcrumbs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useTheme from '@mui/material/styles/useTheme'
import {
  Button,
  Divider,
  FormHelperText,
  Input,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { forwardRef, useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import CkChevronDown from '../assets/icons/CkChevronDown.svg?react'
import { useSnackbar } from '../contexts/SnackbarContext'
import {
  useNavigate,
  Link as RouterLink,
  useParams,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router-dom'

import { createEvento, updateEvento } from '../api/eventos'
import { Local, Evento } from '../api/types'

interface MaskedInputProps extends InputBaseComponentProps {
  mask: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type Inputs = {
  novoNome: string
  novoTipo: string
  novoEmail: string
  novoTelefone?: string | undefined
  novoData: string
  novoHorario: string
  novoLocalAssoc: number
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  function MaskedInput(props, ref) {
    const { mask, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        onAccept={(value: any) =>
          props.onChange({ target: { name: props.name, value } })
        }
      />
    )
  }
)

export default function EventoForm() {
  const { id } = useParams()
  const isEditMode = !!id
  const loaderData = useLoaderData() as Evento | null
  const { locais } = useRouteLoaderData('root') as {
    locais: Local[]
    eventos: Evento[]
  }
  // Hooks do react-hook-form para gerenciar o formulário
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditMode && loaderData) {
      setValue('novoNome', loaderData.nome)
      setValue('novoTipo', loaderData.tipo)
      setValue('novoEmail', loaderData.email)
      setValue('novoTelefone', loaderData.telefone)
      setValue('novoLocalAssoc', loaderData.Local.id)
      setValue(
        'novoData',
        new Date(
          loaderData.data_inicio as unknown as string
        ).toLocaleDateString()
      )
      const dataInicio = new Date(loaderData.data_inicio as unknown as string)
      const hours = String(dataInicio.getHours()).padStart(2, '0')
      const minutes = String(dataInicio.getMinutes()).padStart(2, '0')
      setValue('novoHorario', `${hours}:${minutes}h`)
    }
  }, [isEditMode, loaderData, setValue])

  // Função para lidar com o envio do formulário
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const data_inicio = new Date(
      ...(data.novoData?.split('/').reverse().map(Number) as [
        number,
        number,
        number,
      ]),
      ...(data.novoHorario.replace('h', '').split(':').map(Number) as [
        number,
        number,
      ])
    )
    const data_fim = new Date(data_inicio)
    data_fim.setDate(data_fim.getDate() + 1)

    let convertedData: Omit<Evento, 'id' | 'Local'> = {
      nome: data.novoNome,
      tipo: data.novoTipo,
      email: data.novoEmail,
      telefone: data.novoTelefone,
      local_id: +data.novoLocalAssoc,
      data_inicio: data_inicio,
      data_fim: data_fim,
    }

    try {
      if (isEditMode) {
        await updateEvento(Number(id), convertedData)
      } else {
        await createEvento(convertedData)
      }
      reset()
      showSnackbar(
        'Sucesso',
        isEditMode ? 'Evento atualizado' : 'Novo evento adicionado',
        'success'
      )
      navigate(`/eventos`, { replace: true })
    } catch (error) {
      onError()
      console.error(error)
    }
  }

  // Função para caso algum erro ocorra devido a validação
  const onError = () => {
    showSnackbar(
      'Erro',
      isEditMode
        ? 'não foi possível atualizar o evento'
        : 'não foi possível adicionar um novo evento',
      'error'
    )
  }

  const palette = useTheme().palette
  const { showSnackbar } = useSnackbar()

  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={3}></Grid>
      <Grid container size={6}>
        <Grid size={12}>
          <CustomBreadcrumbs tipo="eventos" />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" color="primary">
              Adicionar novo evento
            </Typography>
            <Typography color="primary" sx={{ fontSize: '14px' }}>
              *Campos obrigatórios
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{ bgcolor: palette.surface.main, borderRadius: '20px' }}
          container
          size={12}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 4,
              gap: 3,
            }}
          >
            <Grid component="form" noValidate container spacing={3} size={12}>
              <Grid size={12}>
                <Typography color="primary">Informações básicas</Typography>
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoNome"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo vazio' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-nome">
                        <Typography color="primary">Nome do evento*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-nome"
                        placeholder="Informe o nome do evento"
                        error={!!errors.novoNome}
                      />
                      {errors.novoNome && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoNome.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoTipo"
                  control={control}
                  rules={{ required: 'Selecione um tipo' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-tipo">
                        <Typography color="primary">
                          Selecione um tipo*
                        </Typography>
                      </InputLabel>
                      <Select
                        {...field}
                        value={field.value || ''}
                        input={<Input />}
                        IconComponent={CkChevronDown}
                        sx={{
                          '& .MuiSelect-icon': { top: 'unset' },
                        }}
                        id="novo-tipo"
                        placeholder="Selecione um tipo"
                        renderValue={(value) =>
                          value ? (
                            value
                          ) : (
                            <Typography
                              color={palette.greyBlue.main}
                              sx={{
                                fontWeight: 400,
                              }}
                            >
                              Selecione um tipo
                            </Typography>
                          )
                        }
                        error={!!errors.novoTipo}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          <em>Selecione um tipo</em>
                        </MenuItem>
                        {['Futebol', 'Show'].map((tipo) => (
                          <MenuItem key={tipo} value={tipo}>
                            {tipo}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.novoTipo && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoTipo.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoData"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Campo vazio',
                    pattern: {
                      value: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                      message: 'Data inválida',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-data">
                        <Typography color="primary">Data do evento*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-data"
                        placeholder="00/00/0000"
                        inputComponent={MaskedInput}
                        inputProps={{ mask: '00/00/0000' }}
                        error={!!errors.novoData}
                      />
                      {errors.novoData && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoData.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoHorario"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Campo vazio',
                    pattern: {
                      value: /^([01]?[0-9]|2[0-3]):[0-5][0-9]h$/,
                      message: 'Horário inválido',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-horario">
                        <Typography color="primary">
                          Horario do evento*
                        </Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-horario"
                        placeholder="Adicione o horário do evento"
                        inputComponent={MaskedInput}
                        inputProps={{ mask: '00:00h' }}
                        error={!!errors.novoHorario}
                      />
                      {errors.novoHorario && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoHorario.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoLocalAssoc"
                  control={control}
                  rules={{ required: 'Selecione um local' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-localassoc">
                        <Typography color="primary">
                          Selecione um Local*
                        </Typography>
                      </InputLabel>
                      <Select
                        {...field}
                        value={field.value || ''}
                        input={<Input />}
                        IconComponent={CkChevronDown}
                        sx={{
                          '& .MuiSelect-icon': { top: 'unset' },
                        }}
                        id="novo-localassoc"
                        placeholder="Selecione um local"
                        renderValue={(value) =>
                          value ? (
                            locais.find((local) => local.id === value)?.nome
                          ) : (
                            <Typography
                              color={palette.greyBlue.main}
                              sx={{
                                fontWeight: 400,
                              }}
                            >
                              Selecione um local
                            </Typography>
                          )
                        }
                        error={!!errors.novoLocalAssoc}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          <em>Selecione um local</em>
                        </MenuItem>
                        {locais.map((local) => (
                          <MenuItem key={local.id} value={local.id}>
                            {local.nome}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.novoLocalAssoc && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoLocalAssoc.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Contato</Typography>
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoEmail"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Campo vazio',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'E-mail inválido',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-email">
                        <Typography color="primary">E-mail*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-email"
                        placeholder="Informe um email"
                        error={!!errors.novoEmail}
                      />
                      {errors.novoEmail && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoEmail.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-telefone">
                  <Typography color="primary">Telefone</Typography>
                </InputLabel>
                <Input
                  id="novo-telefone"
                  placeholder="Informe um telefone"
                  inputComponent={MaskedInput}
                  inputProps={{ mask: '(00) 00000-0000' }}
                  {...register('novoTelefone')}
                ></Input>
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'end' }}>
                  <Button
                    component={RouterLink}
                    to={`/eventos`}
                    variant="outlined"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color="primary">Cancelar</Typography>
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit, onError)}
                    variant="contained"
                    sx={{ textTransform: 'none', radius: '6px', px: 4 }}
                  >
                    <Typography color={palette.onPrimary.main}>
                      Cadastrar
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid size={3}></Grid>
    </Grid>
  )
}
