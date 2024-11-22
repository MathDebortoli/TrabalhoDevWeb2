package trabalho.dev.web.model.domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import java.util.Date;
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "tipo")
@JsonSubTypes({
        @JsonSubTypes.Type(value = SocioDomain.class, name = "socio"),
        @JsonSubTypes.Type(value = DependenteDomain.class, name = "dependente")
})
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class ClienteDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private char sexo;

    @Column(unique = true)
    private String cpf;

    private String rua;
    private int numero;
    private int telefone;

    @Temporal(TemporalType.DATE) // Mapeia o campo Date para um formato de data do banco
    private Date dataNascimento;

    public ClienteDomain() {
    }

    public ClienteDomain(String nome, char sexo, String cpf, String rua, int numero, int telefone, Date dataNascimento) {
        this.nome = nome;
        this.sexo = sexo;
        this.cpf = cpf;
        this.rua = rua;
        this.numero = numero;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }

    public ClienteDomain(String nome, char sexo, Date dataNascimento) {
        this.nome = nome;
        this.sexo = sexo;
        this.dataNascimento = dataNascimento;
    }

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public char getSexo() {
        return sexo;
    }

    public void setSexo(char sexo) {
        this.sexo = sexo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public int getTelefone() {
        return telefone;
    }

    public void setTelefone(int telefone) {
        this.telefone = telefone;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}
