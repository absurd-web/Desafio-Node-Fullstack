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
import { forwardRef, useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'
import CkChevronDown from '../assets/icons/CkChevronDown.svg?react'
import CkAdd from '../assets/icons/CkAdd.svg?react'
import { useSnackbar } from '../contexts/SnackbarContext'
import {
  useNavigate,
  Link as RouterLink,
  useParams,
  useLoaderData,
} from 'react-router-dom'
import { Local } from '../api/types'
import { createLocal, updateLocal } from '../api/locais'

interface MaskedInputProps extends InputBaseComponentProps {
  mask: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type Inputs = {
  novoNome: string
  novoApelido?: string
  novoTipo: string
  novoCnpj?: string
  novoCidade: string
  novoEstado: string
  novoCep: string
  novoEndereco: string
  novoComplemento?: string
  novoEmail: string
  novoTelefone?: string
}

const ESTADOS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

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

export default function LocalForm() {
  const { id } = useParams()
  const isEditMode = !!id
  const loaderData = useLoaderData() as Local | null
  // Hooks do react-hook-form para gerenciar o formulário
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const [entradaInput, setEntradaInput] = useState('')
  const [catracaInput, setCatracaInput] = useState('')
  const [entradas, setEntradas] = useState<Set<string>>(new Set())
  const [catracas, setCatracas] = useState<Set<string>>(new Set())
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditMode && loaderData) {
      setValue('novoNome', loaderData.nome)
      setValue('novoTipo', loaderData.tipo)
      setValue('novoEndereco', loaderData.endereco)
      setValue('novoEmail', loaderData.email)
      setValue('novoTelefone', loaderData.telefone)
      setValue('novoApelido', loaderData.apelido)
      setValue('novoCnpj', loaderData.cnpj)
      setValue('novoCidade', loaderData.cidade)
      setValue('novoEstado', loaderData.uf)
      setValue('novoCep', loaderData.cep)
      setValue('novoComplemento', loaderData.complemento)
      setEntradas(new Set(loaderData.entradas))
      setCatracas(new Set(loaderData.catracas))
    }
  }, [isEditMode, loaderData, setValue])

  // Função para adicionar um item (entrada ou catraca)
  const handleAddItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    if (itemType === 'entrada') {
      setEntradas((prev) => new Set(prev).add(inputValue))
      setEntradaInput('')
    } else {
      setCatracas((prev) => new Set(prev).add(inputValue))
      setCatracaInput('')
    }
  }

  // Função para remover um item (entrada ou catraca)
  const handleRemoveItem = (
    itemType: 'entrada' | 'catraca',
    inputValue: string
  ) => {
    const setFunction = itemType === 'entrada' ? setEntradas : setCatracas
    setFunction((prev) => {
      const newSet = new Set(prev)
      newSet.delete(inputValue)
      return newSet
    })
  }

  // Função para lidar com a tecla Enter nos inputs de entrada e catraca
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemType: 'entrada' | 'catraca'
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      event.preventDefault()
      const inputValue = itemType === 'entrada' ? entradaInput : catracaInput
      handleAddItem(itemType, inputValue)
    }
  }

  // Função para lidar com o envio do formulário
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let convertedData: Omit<Local, 'id' | 'atualizacao'> = {
      nome: data.novoNome,
      tipo: data.novoTipo,
      email: data.novoEmail,
      telefone: data.novoTelefone,
      cidade: data.novoCidade,
      uf: data.novoEstado,
      cep: data.novoCep,
      endereco: data.novoEndereco,
      entradas: Array.from(entradas),
      catracas: Array.from(catracas),
    }

    try {
      if (isEditMode) {
        await updateLocal(Number(id), convertedData)
      } else {
        await createLocal(convertedData)
      }
      reset()
      showSnackbar(
        'Sucesso',
        isEditMode ? 'Local atualizado' : 'Novo local adicionado',
        'success'
      )
      navigate(`/locais`, { replace: true })
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
          <CustomBreadcrumbs tipo="locais" />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5" color="primary">
              Adicionar novo local
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
                        <Typography color="primary">Nome do local*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-nome"
                        placeholder="Informe o nome do local"
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
                <InputLabel htmlFor="novo-apelido">
                  <Typography color="primary">Apelido</Typography>
                </InputLabel>
                <Input
                  id="novo-apelido"
                  placeholder="Informe um apelido (caso exista)"
                  {...register('novoApelido')}
                ></Input>
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
                        {[
                          'Estádio',
                          'Teatro',
                          'Cinema',
                          'Centro de Convenções',
                          'Outro',
                        ].map((tipo) => (
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
                <InputLabel htmlFor="novo-cnpj">
                  <Typography color="primary">CNPJ</Typography>
                </InputLabel>
                <Input
                  id="novo-cnpj"
                  placeholder="Informe o CNPJ (caso conheça)"
                  inputComponent={MaskedInput}
                  inputProps={{ mask: '00.000.000/0000-00' }}
                  {...register('novoCnpj')}
                />
              </Grid>
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Typography color="primary">Localização</Typography>
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoCidade"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo vazio' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-cidade">
                        <Typography color="primary">Cidade*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-cidade"
                        placeholder="Informe a Cidade"
                        error={!!errors.novoCidade}
                      />
                      {errors.novoCidade && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoCidade.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoEstado"
                  control={control}
                  rules={{ required: 'Selecione um estado' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-estado">
                        <Typography color="primary">Estado*</Typography>
                      </InputLabel>
                      <Select
                        {...field}
                        value={field.value || ''}
                        input={<Input />}
                        IconComponent={CkChevronDown}
                        sx={{
                          '& .MuiSelect-icon': { top: 'unset' },
                        }}
                        id="novo-estado"
                        placeholder="Selecione um estado"
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
                              Selecione um estado
                            </Typography>
                          )
                        }
                        error={!!errors.novoEstado}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          <em>Selecione um estado</em>
                        </MenuItem>
                        {ESTADOS.map((estado) => (
                          <MenuItem key={estado} value={estado}>
                            {estado}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.novoEstado && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoEstado.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoCep"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo vazio' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-cep">
                        <Typography color="primary">CEP*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-cep"
                        placeholder="Informe o CEP"
                        inputComponent={MaskedInput}
                        inputProps={{ mask: '00000-000' }}
                        error={!!errors.novoCep}
                      />
                      {errors.novoCep && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoCep.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="novoEndereco"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Campo vazio' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="novo-endereco">
                        <Typography color="primary">Endereço*</Typography>
                      </InputLabel>
                      <Input
                        {...field}
                        id="novo-endereco"
                        placeholder="Informe o Endereço"
                        error={!!errors.novoEndereco}
                      />
                      {errors.novoEndereco && (
                        <FormHelperText
                          sx={{ display: 'flex', justifyContent: 'end' }}
                          error
                        >
                          {errors.novoEndereco.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <InputLabel htmlFor="novo-complemento">
                  <Typography color="primary">Complemento</Typography>
                </InputLabel>
                <Input
                  id="novo-complemento"
                  placeholder="Informe o complemento"
                  {...register('novoComplemento')}
                ></Input>
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
                <Typography color="primary">
                  Cadastro de entradas e catracas
                </Typography>
              </Grid>
              {['entrada', 'catraca'].map((itemType) => (
                <Grid size={6} key={itemType}>
                  <InputLabel htmlFor={`novo-${itemType}s`}>
                    <Typography color="primary">{`Cadastre as ${itemType}s`}</Typography>
                  </InputLabel>
                  <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <Input
                      id={`novo-${itemType}s`}
                      placeholder={`Insira as ${itemType}s`}
                      value={
                        itemType === 'entrada' ? entradaInput : catracaInput
                      }
                      onChange={(e) =>
                        itemType === 'entrada'
                          ? setEntradaInput(e.target.value)
                          : setCatracaInput(e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, itemType as 'entrada' | 'catraca')
                      }
                    />
                    <Button
                      onClick={() =>
                        handleAddItem(
                          itemType as 'entrada' | 'catraca',
                          itemType === 'entrada' ? entradaInput : catracaInput
                        )
                      }
                      sx={{
                        borderRadius: '4px',
                        minHeight: 'unset',
                        minWidth: 'unset',
                        bgcolor: '#051D41',
                      }}
                    >
                      <CkAdd className="icon-add" />
                    </Button>
                  </Box>
                  <Box>
                    {Array.from(
                      itemType === 'entrada' ? entradas : catracas
                    ).map((item) => (
                      <Button
                        key={item}
                        onClick={() =>
                          handleRemoveItem(
                            itemType as 'entrada' | 'catraca',
                            item
                          )
                        }
                        disableRipple
                        sx={{
                          textTransform: 'none',
                          minWidth: 'unset',
                          py: 0.3,
                          borderRadius: '6px',
                          bgcolor: palette.skyBlue.main,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 1,
                          }}
                        >
                          <Typography color={palette.onSecondary.main}>
                            {item}
                          </Typography>
                          <Typography color={palette.greyBlue.main}>
                            X
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Grid>
              ))}
              <Grid size={12}>
                <Divider variant="middle" color={palette.onPrimary.main} />
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'end' }}>
                  <Button
                    component={RouterLink}
                    to={`/locais`}
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
